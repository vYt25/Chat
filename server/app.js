const express = require('express')
const port = 5000
const helmet = require('helmet')
const UserController = require('./routes/UserController.js')
const LoginController = require('./routes/LoginController.js')
const ChatController = require('./routes/ChatController.js')

const app = express()
app.use(helmet())

app.use('/api/users', UserController)
app.use('/api/login', LoginController)
app.use('/api/chats', ChatController)

app.listen(port, function () {
    console.log('listening to port ' + port);
})

