const express = require('express')
const router = express.Router()
const passport = require('passport')

const auth = require('./auth')
const users = require('./users')
const cities = require('./cities')
const companies = require('./companies')
const devices = require('./devices')
const routers = require('./routers')
const bytesUsage = require('./bytes-usage')     

/*
|---------------------------------------------------------------------
| Public API - Version being used
|---------------------------------------------------------------------
*/
router.get('/', (req, res) => {
  res.send({
    version: '1.0.0'
  })
})

router.use('/api/v1/auth', auth)
router.use('/api/v1/users', passport.authenticate('jwt', { session: false }), users)
router.use('/api/v1/cities', cities)
router.use('/api/v1/companies', passport.authenticate('jwt', { session: false }), companies)
router.use('/api/v1/devices', passport.authenticate('jwt', { session: false }), devices)
router.use('/api/v1/routers', passport.authenticate('jwt', { session: false }), routers)
router.use('/api/v1/bytes-usage', passport.authenticate('jwt', { session: false }), bytesUsage)

module.exports = router
