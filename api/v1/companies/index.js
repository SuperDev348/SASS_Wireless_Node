const express = require('express')
const router = express.Router()
const controller = require('./controller')
const { authenticateRole } = require('../../../middlewares')

router.get('/', controller.index)
router.get('/admins', authenticateRole([1, 2, 4]), controller.getAdmins)
router.get('/:id', controller.show)
router.post('/upload-logo', authenticateRole([4]), controller.uploadLogo)
router.put('/:id', authenticateRole([4]), controller.update)
router.post('/', controller.add)
router.post('/create-with-devices', controller.createWithDevices)
router.post('/update-with-devices', controller.updateWithDevices)

module.exports = router
