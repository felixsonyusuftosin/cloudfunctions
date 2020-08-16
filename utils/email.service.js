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
  let testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  // port: 587,
  // secure: false,
  service: 'Gmail',
  auth: {
    user: 'XXX',
    pass: 'XXXX'
  }
})
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html: emailTemplate(email, token)
    })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = {
  sendEmail 
}
