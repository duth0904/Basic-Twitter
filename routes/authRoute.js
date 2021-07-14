const express = require('express')
const Router = express.Router()

const {register, login, getCurrentUser} = require('../controllers/authController')
const {checkCurrentUser} = require('../middlewares/checkCurrentUser')

Router.route('/register').post(register)
Router.route('/login').post(login)
Router.route('/').get(checkCurrentUser, getCurrentUser)

module.exports = Router
