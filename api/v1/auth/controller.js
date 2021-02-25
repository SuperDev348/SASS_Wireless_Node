const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const passport = require('passport')

const { User } = require('../../../models')
const { secret } = require('../../../config/auth')

module.exports = {
  signin: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!user) {
        res.status(404).send({ message: 'User Not found.' })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        })
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).send({
        token
      })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  signup: (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    }).then((user) => {
      user.setRoles([1]).then(() => {
        res.send({ message: 'User was registered successfully!' })
      })
    }).catch((err) => {
      res.status(500).send({ message: err.message })
    })
  },

  getMe: async (req, res) => {
    const { user } = req

    try {
      const company = await user.getCompany()
      const routers = await user.getRoutersByRole()

      res.status(200).send({
        data: Object.assign(user.toJSON(), { company }, { routers })
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  logout: async (req, res) => {
    req.logout()

    res.status(200).send({
      message: 'Successfully logged out'
    })
  }
}