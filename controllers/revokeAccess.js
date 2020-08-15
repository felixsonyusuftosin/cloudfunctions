const  admin = require('firebase-admin')
const { permission  } = require('../utils')

const revokeAccess = async (req, res) => {
  const { body } = req
  const { uid } = body
  if (!uid) {
    return res.status(400).send('You need to pass the uid for this request')
  }
  try {
    const user = await admin.auth().getUser(uid)
    const newUser = { ...user }
    delete newUser.uid
    await admin.auth().updateUser(uid, {
      ...newUser,
      permissions: [permission.revoked]
    })
    return res.send({ message: 'updated user successfully ' })
  } catch (eer) {
    console.error(err)
    return res.status(500).send('could not update this account')
  }
}

module.exports = { 
  revokeAccess
}