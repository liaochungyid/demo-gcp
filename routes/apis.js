const express = require('express')
const router = express.Router()

const pageController = require('../controllers/pageController')

router.get('/browse', pageController.getBrowsePage)
router.get('/content', pageController.getContentPage)
router.get('/media', pageController.getMediaPage)

module.exports = router