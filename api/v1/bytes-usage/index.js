const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/:routerId', controller.getBytesUsage)

module.exports = router
