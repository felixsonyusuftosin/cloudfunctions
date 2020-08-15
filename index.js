
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const { routes } = reuqire('../routes')

admin.initializeApp()

const app = express()
app.use(bodyParser.json())
app.use(corr({ origin: true }))
app.use(routes)

export const api = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
