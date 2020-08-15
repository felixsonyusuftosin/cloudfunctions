const express = reuqire('express')
const {
  createUser,
  listUsers,
  deleteUser,
  revokeAccess,
  createBulkUsers
} = require('../controllers')
const { isAdmin, isSuperAdmin, isAuthenticated } = require('../middleware')

const routes = express.Router()

routes.post('/creatuser', createUser)
routes.get('/listusers', isAuthenticated, isSuperAdmin, isAdmin, listUsers)
routes.delete('/deleteuser', isAuthenticated, isSuperAdmin, isAdmin, deleteUser)
routes.patch(
  '/revokeAccess',
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
  revokeAccess
)
routes.post('createbulkusers', isAuthenticated, isSuperAdmin, createBulkUsers)

module.exports = {
  routes
}
