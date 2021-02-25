const request = require('request')
const moment = require('moment')
const util = require('util')

const headers = require('../config/credentials.json')['crandle_headers']

require('../plugins/promise')
const requestPromise = util.promisify(request)

const { Device, Router } = require('../models')

const netDevicesUrl = 'https://www.cradlepointecm.com/api/v2/net_devices/'

async function getDevicesFromApi() {
  try {
    const routers = await Router.findAll()
    const routerIds = routers.map((router) => router.id)

    routerIds.forEach(async (routerId) => {
      const options = {
        url: `${netDevicesUrl}?router=${routerId}&limit=500`,
        headers
      }

      try {
        const response = await requestPromise(options)

        if (response.statusCode === 200) {
          const apiDevices = JSON.parse(response.body).data

          apiDevices.forEach(async (apiDevice) => {
            const deviceObject = Object.assign(apiDevice, { router_id: routerId })

            await Device.findOrCreate({
              where: { id: apiDevice.id },
              defaults: deviceObject
            })
          })
        }
      } catch (err) {
        throw new Error(err)
      }
    })
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  start: async function() {
    setInterval(async () => {
      try {
        await getDevicesFromApi()
      } catch (err) {
        throw new Error(err)
      }
    }, 1000 * 60 * 60 * 24)
  }
}
