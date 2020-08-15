const  admin = require('firebase-admin')

const batch = 100

module.exports.listUsers = async (req, res ) => {
  const { next } = req.query
  try {
    const { users, pageToken } = admin.auth().listUsers(batch, next)
    return res.send({ users, next: pageToken })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Hey we could not list users for this resource')
  }
}
