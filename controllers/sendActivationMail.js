
const { sendEmail } = require('../utils/email.service')


module.exports.sendActivationMail = async (req, res) => {
  const { body } = req
  const { email, token } = body
  if (!email || !token) {
    return res.status(400).send('Incomplete credentials ')
  }
  try {
    sendEmail({
      from: '"Activation 👻" <noreplyo@copbot.com>',
      to: email,
      subject: 'Your email activation was successful',
      token: token,
      email
    })
    return res.send('success')
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .send('Hey we could not create that user an unexpected error occoured')
  }
}