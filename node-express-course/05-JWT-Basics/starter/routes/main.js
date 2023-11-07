const express = require('express')
const router = express.Router()

const {dashboard, login} = require('../controllers/main')
const authentificationMiddleware = require('../middleware/auth');




router.route('/dashboard').get(authentificationMiddleware, dashboard) // Every time we hit this route, they will be a check through the middleware first
router.route('/login').post(login)

module.exports = router
