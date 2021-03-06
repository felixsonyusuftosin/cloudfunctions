const admin = require('firebase-admin')
const { permission } = require('../utils')

const getTokenValue = async req => {
  const { authorization } = req.headers
  const split = authorization.split('Bearer ')
  const token = split[1].trim()
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)

    return decodedToken
  } catch (err) {
    console.error(err)
    return false
  }
}

const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    console.log(' no authorization header')
    return res.status(401).send({ message: 'Unauthorized' })
  }
  if (!authorization.startsWith('Bearer'))
    return res.status(401).send({ message: 'Unauthorized' })
  const split = authorization.split('Bearer ')
  if (split.length !== 2)
    return res.status(401).send({ message: 'Unauthorized' })
  const token = split[1].trim()
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      permissions: decodedToken.permissions,
      email: decodedToken.email
    }
    return next()
  } catch (err) {
    console.error(`${err.code} -  ${err.message}`)
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
const isAdmin = async (req, res, next) => {
  const { email } = await getTokenValue(req) || {}
  if (!email) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  const { customClaims } =  await admin.auth().getUserByEmail(email) || {}
  const { permissions = [] } = customClaims ||  { }
  if (!permissions.length) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  if (!permissions.includes(permission.admin)) {
    return res.status(409).send({ message: 'Not Permited' })
  }
  return next()
}
const isSuperAdmin = async (req, res, next) => {
  const { email } = await getTokenValue(req) || {}
  if (!email) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  const { customClaims } =  await admin.auth().getUserByEmail(email) || {}
  const { permissions = [] } = customClaims || { }
  if (!permissions.length) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  if (!permissions.includes(permission.superAdmin)) {
    return res.status(409).send({ message: 'Not Permited' })
  }
  return next()
}

const isOwner = async (req, res, next) => {}

module.exports = { 
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
  isOwner
}
