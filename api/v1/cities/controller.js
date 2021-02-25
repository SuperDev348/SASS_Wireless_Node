const { City } = require('../../../models')
const { secret } = require('../../../config/auth')

module.exports = {
  getCities: async (req, res) => {
    try {
      const cities = await City.findAll({
        where: {
          state: req.params.state
        }
      })

      res.status(200).send(cities)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}