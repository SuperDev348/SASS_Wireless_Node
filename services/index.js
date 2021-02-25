const dataUsageService = require('./data-usage-service')
const routersService = require('./router')
const devicesService = require('./devices')

module.exports = {
  start: async function() {
    routersService.start()
    devicesService.start()
    dataUsageService.start()
  }
}
