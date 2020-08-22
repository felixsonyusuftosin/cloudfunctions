const admin = require('firebase-admin')
const { permission } = require('../utils')

const registerSignin = async (req, res) => {
  const { body } = req
  const { uid } = body
  if (!uid) {
    return res.status(400).send('You need to pass the uid for this request')
  }
  try {
    const user = await admin.auth().getUser(uid)
    const newUser = { ...user }
    delete newUser.uid
    await admin.auth().setCustomUserClaims(uid, { signedIn: new Date().toLocaleDateString()  })
    return res.send({ message: 'signed in user successfully' })
  } catch (eer) {
    console.error(err)
    return res.status(500).send('could not sign in this account')
  }
}

const registerSignout = async (req, res) => {
  const { body } = req
  const { uid, email } = body
  // if (!uid || !email) {
  //   return res.status(400).send('You need to pass the uid for this request')
  // }
  try {

    const  user = uid ? await admin.auth().getUser(uid) : await admin.auth().getUserByEmail(email)
    const newUser = { ...user }
    delete newUser.uid
    await admin.auth().setCustomUserClaims(user.uid, { signedIn: null  })
    return res.send({ message: 'signed out user successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).send('could not sign out  this account')
  }
}

const checkSigninConstraint = async (req, res) => { 
  const { email } = req.query
  if ( !email ) { 
    return res.status(400).send('You need to pass the uid for this request')
  }
  const user =  await admin.auth().getUserByEmail(email)
  if (!user) { 
    return res.status(404).send('No user found with this email')
  }
  const { customClaims = {} } = user
  const { signedIn, permissions = [] } = customClaims
  if (signedIn || permissions.includes(permission.revoked) ) { 
    return res.status(409).send('Not permitted: There is an activation lock on the account or your permission has being revoked ')
  }
  return res.send({ status: 'success'})

}


module.exports = { 
  registerSignin,
  registerSignout,
  checkSigninConstraint 
}

