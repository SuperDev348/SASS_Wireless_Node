'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parentCompanyId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logoLink: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logoType: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      crandleUsername: {
        type: Sequelize.STRING
      },
      crandlePassword: {
        type: Sequelize.STRING
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Companies')
  }
}
