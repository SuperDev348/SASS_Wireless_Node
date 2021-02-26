const { Op } = require('sequelize')
const { Router, Company } = require('../../../models')

module.exports = {
  index: async (req, res) => {
    try {
      const routers = await req.user.getRoutersByRole()

      res.status(200).send({
        data: routers
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  assignCompany: async (req, res) => {
    try {
      const company = await Company.findByPk(req.body.companyId)

      if (!company) {
        res.status(404).send({
          message: 'Company Not Found'
        })
      }

      const router = await Router.findByPk(req.body.routerId)

      if (!router) {
        res.status(404).send({
          message: 'Router Not Found'
        })
      }

      company.addRouter(router.id)

      res.send({
        message: `Router ${router.full_product_name} was successfully assigned to company ${company.name}`
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const router = await Router.findByPk(req.params.id)

      if (!router) {
        return res.status(404).send({
          message: 'User Not Found'
        })
      }

      await router.update({
        customerAssignedName: req.body.customerAssignedName || router.customerAssignedName
      })

      return res.status(200).send({
        message: 'Successfully updated'
      })
    } catch (err) {
      res.status(400).send(err)
    }
  }
}