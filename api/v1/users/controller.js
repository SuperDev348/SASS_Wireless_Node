const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { User, UserRole, Profile, Role, City, Company } = require('../../../models')
const { secret } = require('../../../config/auth')

module.exports = {
  getKoreUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          roleId: 1
        }
      })

      res.status(200).send(users)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  getCompanyUsers: async (req, res) => {
    try {
      const { user } = req
      let companies

      if (user.roleId === 4) {
        companies = await Company.findAll({
          where: {
            [Op.or]: [
              {
                id: user.companyId
              }, {
                parentCompanyId: user.companyId
              }
            ]
          }
        })
      } else {
        companies = await Company.findAll({
          where: {
            id: user.companyId
          }
        })
      }

      const companyIds = companies.map((company) => company.id)

      const users = await User.findAll({
        where: {
          companyId: {
            [Op.in]: companyIds
          }
        }, include: [{
          model: Company,
          as: 'company'
        }]
      })

      res.status(200).send(users)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  add: async (req, res) => {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        companyId: req.body.companyId,
        password: bcrypt.hashSync('password', 8),
        roleId: req.body.role
      })

      await user.createProfile({
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        address: req.body.address,
        phone: req.body.phone
      })

      res.status(201).send('Successfully created')
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{
          model: Profile,
          as: 'profile'
        }]
      })

      if (!user) {
        res.status(404).send({
          message: 'User Not Found'
        })
      }

      const cities = await City.findAll({
        where: {
          state: user.profile.state
        }
      })

      res.status(200).send({ user, cities })
    } catch (error) {
      res.status(400).send(error)
    }
  },

  update: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{
          model: Profile,
          as: 'profile'
        }]
      })

      if (!user) {
        return res.status(404).send({
          message: 'User Not Found'
        })
      }

      await user.update({
        username: req.body.username || user.username,
        email: req.body.email || user.email,
        roleId: req.body.roleId || user.roleId
      })

      await user.profile.update({
        state: req.body.state || user.state,
        city: req.body.city || user.city,
        zip: req.body.zip || user.zip,
        address: req.body.address || user.address,
        country: req.body.country || user.country,
        phone: req.body.phone || user.phone
      })

      return res.status(200).send('Successfully updated')
    } catch (err) {
      res.status(400).send(err)
    }
  }
}