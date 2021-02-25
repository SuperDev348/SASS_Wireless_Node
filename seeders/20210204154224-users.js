const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'Kore Super Admin',
      email: 'koresuperadmin@koregroup.com',
      password: bcrypt.hashSync('WgJwsEqpdYjbDFapAH4nVTst'),
      roleId: 100
    }, {
      id: 2,
      username: 'Kore Admin',
      email: 'koreadmin@koregroup.com',
      password: bcrypt.hashSync('WgJwsEqpdYjbDFapAH4nVTst'),
      roleId: 1
    }], {})

    await queryInterface.bulkInsert('Profiles', [{
      userId: 1,
      address: '',
      zip: '',
      state: '',
      city: '',
      country: '',
      phone: ''
    }, {
      userId: 2,
      address: '',
      zip: '',
      state: '',
      city: '',
      country: '',
      phone: ''
    }], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {})
    await queryInterface.bulkDelete('Profiles', null, {})
  }
}
