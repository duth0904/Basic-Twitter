//Dotenv
require('dotenv').config()
// Connect DB
const {connectDB} = require('./configs/db')
connectDB()

const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')

const app = express()

// Cors
app.use(cors()) // Connect fe end be (client and server)
//Body parser is middleware inputs => json object (before go into server)
app.use(express.json())

//Mount the route
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)

//Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = {
        error: 404,
        message: not_found,
        status : 400,
        data: null
    }
    next(err)
})

// Error handler

app.use((err, req, res, next) => {
    return res.status(400).json({
        error: err.error,
        message: err.message,
        status : 400,
        data: null
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('Server is running on port 5000')
})