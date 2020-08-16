const express = require('express')
const {
  createUser,
  listUsers,
  deleteUser,
  revokeAccess,
  createBulkUsers,
  grantPermission,
  sendActivationMail
} = require('../controllers')
const { isAdmin, isSuperAdmin, isAuthenticated } = require('../middleware')

const routes = express.Router()

routes.post('/creatuser', createUser)
routes.get('/listusers',  isAuthenticated, isSuperAdmin, listUsers)
routes.delete('/deleteuser', isAuthenticated, isSuperAdmin, deleteUser)
routes.patch(
  '/revokeaccess',
  isAuthenticated,
  isSuperAdmin,
  revokeAccess
)
routes.post('/sendactivation', isAuthenticated, isSuperAdmin, sendActivationMail)
routes.patch(
  '/replaceaccess',
  isAuthenticated,
  isSuperAdmin,
  grantPermission
)
routes.post('createbulkusers', isAuthenticated, isSuperAdmin, createBulkUsers)

module.exports = {
  routes
}
