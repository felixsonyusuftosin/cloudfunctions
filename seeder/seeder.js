const users = require('./data.json')
const { v4: uuid } = require('uuid')
const admin = require('firebase-admin')
const { permission } = require('../utils')

const importUsers = async () => {
  let currentCount = 0
  console.log(
    `Found ${users.length} users to import, this will be done in ${Math.ceil(
      users.length / 1000
    )} batches\n`
  )
  while (currentCount < users.length) {
    const userListRaw = users.slice(currentCount, currentCount + 1000)
    const userList = userListRaw.map((email) =>{  
      const password = uuid()
      const uid = uuid()
      const customClaims = { 
        permissions: [permission.basic],
        token: password
      }
      return { email, uid, password, customClaims  }
      
    })
    console.log(
      `Importing users from ${currentCount + 1} to ${currentCount + 1000}\n`
    )
    try {
      // eslint-disable-next-line no-await-in-loop
      const userImportResult = await admin.auth().importUsers(userList)
      const { errors } = userImportResult
      if (errors && errors.length) {
        console.log(`${errors.length} Could not be imported\n`, errors)
      } else {
        console.log(
          `imported ${currentCount} to ${
            currentCount + 1000
          } users successfully\n`
        )
      }
    } catch (error) {
      console.error(error)
      break
    }
    currentCount += 1000
  }
  return 
}

module.exports = {
  importUsers
}
