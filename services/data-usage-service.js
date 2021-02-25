const request = require('request')
const moment = require('moment')
const util = require('util')

const { Device, BytesUsage, Router } = require('../models')

const env = process.env.NODE_ENV || 'development'
const headers = require('../config/credentials.json')['crandle_headers']

require('../plugins/promise')
const requestPromise = util.promisify(request)

const limitCount = 500
const deviceUsageSamplesUrl = 'https://www.cradlepointecm.com/api/v2/net_device_usage_samples/'

async function queryByesRecord() {
  const oneHourAgo = moment.utc().subtract(1, 'hour').format()
  const now = moment.utc().format()

  try {
    const devices = await Device.findAll()

    devices.forEach(async (device) => {
      const options = {
        url: `${deviceUsageSamplesUrl}?limit=${limitCount}&net_device__in=${device.id}&created_at__lt=${now}&created_at__gt=${oneHourAgo}`,
        headers
      }

      try {
        const response = await requestPromise(options)

        if (response.statusCode === 200) {
          const usageSamples = JSON.parse(response.body).data

          console.log(usageSamples)

          usageSamples.forEach(async (sample) => {
            const router = await Router.findByPk(device.router_id)
            const sampleObject = Object.assign(sample, {
              deviceId: device.id,
              routerId: device.router_id,
              routerState: router ? router.state : null
            })

            await BytesUsage.create(sampleObject)
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
    setInterval(() => {
      try {
        queryByesRecord()
      } catch (err) {
        console.log(err)
      }
    }, 1000 * 60 * 60)
  }
}
