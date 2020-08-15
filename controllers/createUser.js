const  admin = require('firebase-admin')
const { permission  }= require('../utils')

module.exports.createUser = async (req, res) => {
  const { body } = req
  const { email, password } = body
  if (!email || !password) {
    return res.status(400).send('Incomplete credentials ')
  }
  try {
    const { uid } = await admin.auth().createUser({ ...body, permissions: [ permission.basic] })
    return res.send(uid)
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .send('Hey we could not create that user an unexperced error occoured')
  }
}
