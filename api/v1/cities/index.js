const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/:state', controller.getCities)

module.exports = router
