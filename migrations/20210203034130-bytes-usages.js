module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('BytesUsages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.INTEGER
      },
      routerId: {
        type: Sequelize.INTEGER
      },
      bytes_in: {
        type: Sequelize.INTEGER
      },
      bytes_out: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      created_at_timeuuid: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.FLOAT
      },
      uptime: {
        type: Sequelize.FLOAT
      },
      routerState: {
        type: Sequelize.STRING
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bytesUsages')
  }
}
