
const { importUsers } = require('../seeder/seeder')

module.exports.seedUsers = async (req, res) => {
  try {
    await importUsers()
    return res.send({ message: 'success' })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Could not import users')
  }
}
