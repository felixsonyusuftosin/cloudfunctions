const { createUser } =  require('./createUser')
const { deleteUser } =  require('./deleteUser')
const { listUsers }  = require('./listUsers')
const { revokeAccess } = require('./revokeAccess')
const { createBulkUsers } =  require('./createBulkUsers')
const { grantPermission } = require('./grantPermission')
const { sendActivationMail} = require('./sendActivationMail')

module.exports = { 
  createUser, deleteUser, listUsers, revokeAccess, createBulkUsers, grantPermission, sendActivationMail
}
