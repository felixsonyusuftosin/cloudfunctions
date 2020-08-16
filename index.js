
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const { routes } = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')

admin.initializeApp()

const app = express()
app.use(bodyParser.json())
app.use(cors({ origin: true }))
app.use(routes)

const api = functions.https.onRequest(app)

module.exports = { 
  api
}
