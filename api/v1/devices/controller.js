const { Op } = require('sequelize')
const querystring = require('querystring')
const url = require('url')
const { Device } = require('../../../models')

module.exports = {
  index: async (req, res) => {
    try {
      let devices
      const { routerId } = url.parse(req.url, true).query

      if (routerId) {
        devices = await Device.findAll({
          where: {
            router_id: routerId
          }
        })
      } else {
        devices = await Device.findAll()
      }

      res.status(200).send(devices)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}