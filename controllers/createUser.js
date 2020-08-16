const admin = require('firebase-admin')
const { permission } = require('../utils')
const { v4: uuid } = require('uuid')
const { sendEmail } = require('../utils/email.service')


module.exports.createUser = async (req, res) => {
  const { body } = req
  const { email, password, permissions: bodyPermissions = [] } = body
  if (!email || !password) {
    return res.status(400).send('Incomplete credentials ')
  }
  const tokenAsPassword = uuid()
  const newBody = { ...body }
  delete newBody.password
  newBody.password = tokenAsPassword

  try {
    const { uid } = await admin.auth().createUser({ ...newBody })
    await admin
      .auth()
      .setCustomUserClaims(uid, {
        token: tokenAsPassword,
        permissions: Array.from(new Set([...bodyPermissions, permission.basic]))
      })
    sendEmail({
      from: '"Activation 👻" <noreplyo@copbot.com>',
      to: email,
      subject: 'Your email activation was successful',
      token: tokenAsPassword,
      email
    })
    return res.send(uid)
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .send('Hey we could not create that user an unexperced error occoured')
  }
}
