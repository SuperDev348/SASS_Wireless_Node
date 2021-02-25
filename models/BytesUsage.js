const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class BytesUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BytesUsage.belongsTo(models.Router, {
        foreignKey: 'routerId',
        as: 'router'
      })

      BytesUsage.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        as: 'device'
      })
    }
  }

  BytesUsage.init({
    routerId: DataTypes.INTEGER,
    deviceId: DataTypes.INTEGER,
    bytes_in: DataTypes.INTEGER,
    bytes_out: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    created_at_timeuuid: DataTypes.STRING,
    period: DataTypes.FLOAT,
    uptime: DataTypes.FLOAT,
    routerState: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'BytesUsage'
  })

  return BytesUsage
}