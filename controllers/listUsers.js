const admin = require('firebase-admin')

const batch = 100

module.exports.listUsers = async (req, res) => {
  const { next, total = batch } = req.query
  try {
    const userListResponse = await admin.auth().listUsers(Number(total), next)
    const { users, pageToken } = userListResponse
    const lis = users.map(userRecord => ({ ...userRecord }))
    return res.send({ data: lis, next: pageToken })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Hey we could not list users for this resource')
  }
}

module.exports.getUser = async (req, res) => {
  const { uid } = req.query
  if (!uid) {
    return res.status(400).send('UID is required')
  }
  try {
    const user = await admin.auth().getUser(uid)
    if (!user) {
      return res.status(400).send('No user with the credentials found')
    }
    return res.send(user)
  } catch (err) {
    console.log(err)
    return res.status(500).send('We cold not get the requested user')
  }
}
