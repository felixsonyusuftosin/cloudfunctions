const  admin = require('firebase-admin')
const { permission  }= require('../utils')

module.exports.createBulkUsers = async (req, res) => {
  const { body } = req
  const { users = [] } = body
  if (!users || !users.length) {
    res.status(400).send('You did not pass in a list of users to import ')
  }
  try {
    const newUsers = users.map(user => ({
      ...user,
      permissions: [permission.basic]
    }))
    const userImportResult = admin.auth().importUsers(newUsers)
    const { errors } = userImportResult
    if (errors && errors.length) {
      return res.send({
        message: 'success',
        info: `${errors.length} Could not be importee`,
        detials: errors
      })
    } else {
      return res.send({ message: 'success' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Could not import users')
  }

  return {}
}
