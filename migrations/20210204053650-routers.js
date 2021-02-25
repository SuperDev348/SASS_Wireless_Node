module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Routers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER
      },
      serial_number: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      customerAssignedName: {
        type: Sequelize.STRING
      },
      full_product_name: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      state_updated_at: {
        type: Sequelize.DATE
      },
      ipv4_address: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      sim1: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      sim2: {
        type: Sequelize.STRING,
        defaultValue: ''
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Routers')
  }
}
