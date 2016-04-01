// TypeScript definitions
/// <reference path='../typings/tsd.d.ts' />

import express = require('express')
import http = require('http')
import bodyParser = require('body-parser')
// import auth = require('./auth')

// Flip this back and forth to oallow
var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000')
  // res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'X-Auth'])
  next()
}

// Define App and Middleware
var app = express()
app.use(bodyParser.json())
app.use(allowCrossDomain)
// app.use(auth)

// Routes
// app.use '/api/sessions', require './controllers/sessions'
// app.use '/api/users', require './controllers/users'
// app.use '/api/timeLogs', require './controllers/timeLogs'

var server = http.createServer(app)
app.set('server', server)
app.get('server').listen(3000, () => {
  console.log('Server listening on :3000')
})

import Yelp = require('./yelp')
// Yelp.sample()
