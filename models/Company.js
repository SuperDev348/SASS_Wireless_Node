const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Router, {
        foreignKey: 'companyId',
        as: 'routers'
      })

      Company.hasMany(models.User, {
        foreignKey: 'companyId',
        as: 'users'
      })
    }
  }

  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentCompanyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logoLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logoType: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    crandleUsername: {
      type: DataTypes.STRING
    },
    crandlePassword: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Company'
  })

  return Company
}