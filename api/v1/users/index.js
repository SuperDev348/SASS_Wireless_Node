const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/kore-users', controller.getKoreUsers)
router.get('/company-users', controller.getCompanyUsers)
router.get('/:id/edit', controller.getById)
router.put('/:id', controller.update)
router.post('/', controller.add)

module.exports = router      
