const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const api = require('./server/Routes/api')
const http = require('http')
const socketio = require('socket.io')
const app = express()


//create server for socket
const server = http.createServer(app)
const io = socketio(server)


//run when client connects
io.on('connection', socket => {
    socket.emit('chat-messege')
    console.log('new websocket connection');
    
})


//Database creation
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/usersDB', { useNewUrlParser: true })



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



//port for server

const port = process.env.PORT || 3001
server.listen(port, function () {
    console.log(`Running on port ${port}`)
})