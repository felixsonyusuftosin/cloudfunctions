const express = require('express')
const {
  createUser,
  listUsers,
  deleteUser,
  revokeAccess,
  createBulkUsers,
  grantPermission,
  sendActivationMail,
  seedUsers,
  registerSignin, 
  registerSignout,
  checkSigninConstraint,
  getUser
} = require('../controllers')
const { isAdmin, isSuperAdmin, isAuthenticated } = require('../middleware')

const routes = express.Router()

routes.post('/creatuser', createUser)
routes.get('/listusers',  isAuthenticated, isSuperAdmin, listUsers)
routes.get('/checkconstraint', checkSigninConstraint)
routes.delete('/deleteuser', isAuthenticated, isSuperAdmin, deleteUser)
routes.get('/getuser', isAuthenticated, isSuperAdmin, getUser)
routes.patch(
  '/revokeaccess',
  isAuthenticated,
  isSuperAdmin,
  revokeAccess
)
routes.post('/sendactivation', isAuthenticated, isSuperAdmin, sendActivationMail)
routes.post('/registerdevice', isAuthenticated, registerSignin)
routes.delete('/clearip', registerSignout)
routes.patch(
  '/replaceaccess',
  isAuthenticated,
  isSuperAdmin,
  grantPermission
)
routes.post('/createbulkusers', isAuthenticated, isSuperAdmin, createBulkUsers)
routes.post('/seedUsers', seedUsers)

module.exports = {
  routes
}
