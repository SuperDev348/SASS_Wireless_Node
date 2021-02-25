const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

const { User } = require('../models')
const { secret } = require('../config/auth')

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secret

passport.use(new JwtStrategy(opts, async (token, done) => {
  try {
    const user = await User.findByPk(token.id)

    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (error) {
    return done(err, false)
  }
}))