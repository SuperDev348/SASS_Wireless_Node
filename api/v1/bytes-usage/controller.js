const { Op } = require('sequelize')
const querystring = require('querystring')
const url = require('url')
const { Router, BytesUsage, Device } = require('../../../models')

module.exports = {
  getBytesUsage: async (req, res) => {
    try {
      const { routerId } = req.params
      const { timeTo, timeFrom } = req.query

      const router = await Router.findByPk(routerId)

      if (!router) {
        res.status(404).send({
          message: 'Router Not Found'
        })
      }

      bytesUsages = await router.getBytesUsages({
        order: [
          ['created_at', 'ASC']
        ],
        attributes: ['bytes_in', 'bytes_out', 'deviceId', 'created_at'],
        include: [{
          model: Device,
          as: 'device',
          attributes: ['service_type']
        }]
      })
      const To = new Date(timeTo)
      const From = new Date(timeFrom)
      const data = bytesUsages.filter((usage) => {     
        const date = new Date(usage.created_at)

        return date >= From && date <= To
      })

      res.status(200).send({
        data: data
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}