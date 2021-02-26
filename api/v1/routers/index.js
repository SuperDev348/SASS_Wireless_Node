const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/', controller.index)
router.post('/assign-company', controller.assignCompany)
router.put('/:id', controller.update)

module.exports = router
