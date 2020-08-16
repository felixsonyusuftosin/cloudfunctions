const  admin = require('firebase-admin')

const batch = 100

module.exports.listUsers = async (req, res ) => {
  const { next } = req.query
  try {
    const userListResponse = await admin.auth().listUsers(batch, next)
    const { users, pageToken } = userListResponse
    const lis = users.map(userRecord => ({ ...userRecord }) )
    res.send({ data: lis , next: pageToken })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Hey we could not list users for this resource')
  }
}
