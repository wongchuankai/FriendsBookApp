const express = require('express')
require('dotenv').config
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/db')
const router = require('./router/router')
const secureRouter = require('./router/secure-router')
const passport = require('passport');
const app = express()
const apiPort = process.env.PORT || 8000
const verifyJWT = require('./auth/jwtverification')
require('./auth/auth');

db.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err) // your callback here
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', router)
app.use('/api/secure', verifyJWT, secureRouter)

// Handle errors.
app.use(function(err, req, res, next) {
    return res.status(400).json({
        success: false,
        msg: err.message
    })
  });
app.get('/', (req, res) => {
    res.send('server connected to heroku.')
})  

app.listen(apiPort, () => {
    console.log(`server is running at port ${apiPort}`)
})