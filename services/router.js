const request = require('request')
const moment = require('moment')
const util = require('util')

const headers = require('../config/credentials.json')['crandle_headers']

require('../plugins/promise')
const requestPromise = util.promisify(request)

const { Router } = require('../models')

const routersUrl = 'https://www.cradlepointecm.com/api/v2/routers/'

async function getRoutersFromApi() {
  const options = {
    url: routersUrl,
    headers
  }

  try {
    const response = await requestPromise(options)

    if (response.statusCode === 200) {
      return JSON.parse(response.body).data
    } else {
      return []
    }
  } catch (err) {
    throw new Error(err)
  }
}

async function processRouters(apiRouters) {
  apiRouters.forEach(async (apiRouter) => {
    try {
      await Router.findOrCreate({
        where: { id: apiRouter.id },
        defaults: apiRouter
      })
    } catch (err) {
      throw new Error(err)
    }
  })
}

module.exports = {
  start: async function() {
    setInterval(async () => {
      try {
        const routers = await getRoutersFromApi()

        await processRouters(routers)
      } catch (err) {
        console.log(err)

        throw new Error(err)
      }
    }, 1000 * 60 * 60 * 24)
  }
}
