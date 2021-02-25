'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      id: 1,
      name: 'Kore Admin'
    }, {
      id: 2,
      name: 'Kore Manager'
    }, {
      id: 3,
      name: 'Kore Viewer'
    }, {
      id: 4,
      name: 'Customer Admin'
    }, {
      id: 5,
      name: 'Customer Manager'
    }, {
      id: 6,
      name: 'Customer Operator'
    }, {
      id: 100,
      name: 'Super Admin'
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
