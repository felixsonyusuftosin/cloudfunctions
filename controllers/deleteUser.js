const  admin = require('firebase-admin')

module.exports.deleteUser = async (req, res) => { 
  const { body } = req
  const { uid } = body 
  if (!uid) {
    return res.status(400).send('Incomplete request uid is missing')
  }
  try {
    await admin.auth().deleteUser(uid)
    return res.send({ message: `deleted user with ${uid} successfully`})
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .send('We could not delete the user somthing happened')
  }

}