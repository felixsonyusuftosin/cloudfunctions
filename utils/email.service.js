const nodemailer = require('nodemailer')

const emailTemplate = (email, token) => {
  return `
    <div>
    <h4> Your Account has been created</h4>
    <h2> Email: ${email}</h2>
    <h2> Token: ${token}</h2>
    </div>
    `
}
const sendEmail = async ({ from, to, subject, email, token }) => {
const transporter = nodemailer.createTransport({
  // host: 'smtp.office365.com',
  // port: 587,
  // secureConnection: false,
  service: 'Gmail',
  auth: {
    user: 'copbotdonotreply@gmail.com',
    pass: 'ted!12345!'
  }
})
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html: emailTemplate(email, token)
    })
    console.log('sent email')
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = {
  sendEmail 
}
