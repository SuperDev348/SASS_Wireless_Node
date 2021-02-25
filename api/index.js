const express = require('express')
const APIv1 = require('./v1')

const router = express.Router()

// API Versions
// Latest
// router.use('/api', APIv1)

// Note: left this endpoint without the '/api' to keep compatibility with the current use case: POST to '/'
router.use('/', APIv1)

// V1     
router.use('/api/v1', APIv1)

module.exports = router
