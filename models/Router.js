const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Router extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Router.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      })

      Router.hasMany(models.BytesUsage, {
        foreignKey: 'routerId',
        as: 'bytesUsages'
      })
    }
  }

  Router.init({
    companyId: {
      type: DataTypes.INTEGER
    },
    serial_number: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    customerAssignedName: {
      type: DataTypes.STRING
    },
    full_product_name: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.BOOLEAN
    },
    state_updated_at: {
      type: DataTypes.DATE
    },
    ipv4_address: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    sim1: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    sim2: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Router'
  })

  return Router
}