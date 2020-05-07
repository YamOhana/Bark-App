const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();


//test
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./server/Routes/api')
const http = require('http')
const app = express()

const server = http.createServer(app)

//manage middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})


app.use('/', api)

exports.app = functions.https.onRequest(app);

//port for server
// process.env.PORT ||
const port =  3001
server.listen(port, function () {
    console.log(`Running on port ${port}`)
})

