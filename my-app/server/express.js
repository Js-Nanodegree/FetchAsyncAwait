const {Server} =require('http')
const app =require('express')()
module.exports.app = app
const server = Server(app)
module.exports.server = server
const socketio = require('socket.io')(server)
const cookieParser  = require('cookie-parser')
const mongoose = require('mongoose')
const socketIOSession  = require('express-socket.io-session')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)



const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 14 // 14 days
  })
  module.exports.sessionStore = sessionStore





const appSession = session({
    store: sessionStore,
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: true
  })
  module.exports.appSession = appSession
