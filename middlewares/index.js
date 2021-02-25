const passport = require('passport')

module.exports = {
	auth: passport.authenticate('jwt', { session: false }),

  authenticateRole: (roleArray) => (req, res, next) => {
	  if(!req.user) {
	    return res.status(401).send('Unauthorized')
	  }

    for (let i = roleArray.length - 1; i >= 0; i--) {
      if (req.user.roleId === roleArray[i]) {
        return next()
      }
    }

	  res.status(401).send('Unauthorized')
	}
}