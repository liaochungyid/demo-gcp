const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const mainController = require('../controllers/mainController')
const userController = require('../controllers/userController')

router.get('/',mainController.getIndexPage)
router.get('/login', userController.getLoginPage)
router.post('/login', userController.loginParser, passport.authenticate('local'), userController.login)
router.get('/logout', userController.logout)

module.exports = router
