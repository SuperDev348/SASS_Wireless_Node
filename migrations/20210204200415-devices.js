module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      router_id: {
        type: Sequelize.INTEGER
      },
      ipv4_address: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      pin_status: {
        type: Sequelize.STRING
      },
      carrier: {
        type: Sequelize.STRING
      },
      hostname: {
        type: Sequelize.STRING
      },
      iccid: {
        type: Sequelize.STRING
      },
      imei: {
        type: Sequelize.STRING
      },
      imsi: {
        type: Sequelize.STRING
      },
      serial: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      mode: {
        type: Sequelize.STRING
      },
      port: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      service_type: {
        type: Sequelize.STRING
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Devices')
  }
}
