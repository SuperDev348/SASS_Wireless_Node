const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.hasMany(models.BytesUsage, {
        foreignKey: 'deviceId',
        as: 'bytesUsages'
      })
    }
  }

  Device.init({
    router_id: {
      type: DataTypes.INTEGER
    },
    ipv4_address: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    pin_status: {
      type: DataTypes.STRING
    },
    carrier: {
      type: DataTypes.STRING
    },
    hostname: {
      type: DataTypes.STRING
    },
    iccid: {
      type: DataTypes.STRING
    },
    imei: {
      type: DataTypes.STRING
    },
    imsi: {
      type: DataTypes.STRING
    },
    serial: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
    mode: {
      type: DataTypes.STRING
    },
    port: {
      type: DataTypes.STRING
    },
    version: {
      type: DataTypes.STRING
    },
    service_type: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Device'
  })
  
  return Device
}