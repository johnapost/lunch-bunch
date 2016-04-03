// TypeScript definitions
/// <reference path='../typings/tsd.d.ts' />

import express = require('express')
import http = require('http')
import bodyParser = require('body-parser')
var yelpApi = require('yelp')
var yelp = new yelpApi({
  consumer_key: process.env.LUNCH_CON_KEY,
  consumer_secret: process.env.LUNCH_CONS_SEC,
  token: process.env.LUNCH_TOK,
  token_secret: process.env.LUNCH_TOK_SEC
})

// Flip this back and forth to allow CORS
var allowCrossDomain = (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:4000')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'X-Auth'])
  next()
}

// Define App and Middleware
var app = express()
app.use(bodyParser.json())
app.use(allowCrossDomain)

// Routes
app.get('/yelp/sample', (req, res, next) => {
  yelp.search({term: 'food', location: 'Jacksonville'})
    .then((data) => {
      return res.json(data)
    })
    .catch((err) => {
      return next(err)
    })
})

var server = http.createServer(app)
app.set('server', server)
app.get('server').listen(3000, () => {
  console.log('Server listening on :3000')
})
