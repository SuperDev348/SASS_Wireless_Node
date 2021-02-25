const {
  Model, Op
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        through: 'userRoles',
        foreignKey: 'userId',
        as: 'profile'
      })

      User.belongsToMany(models.Role, {
        through: 'userRoles',
        foreignKey: 'userId',
        as: 'roles'
      })

      User.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      })
    }

    isKoreUser() {
      return [1, 2, 3].includes(this.roleId)
    }

    async getCompaniesByRole() {
      try {
        if (this.isKoreUser()) {
          return await sequelize.models.Company.findAll()
        } else if (this.roleId === 4) {
          return await sequelize.models.Company.findAll({
            where: {
              [Op.or]: [
                {
                  id: this.companyId
                }, {
                  parentCompanyId: this.companyId
                }
              ]
            }
          })
        } else if (this.roleId === 5) {
          return await this.getCompany()
        } else {
          return []
        }
      } catch (err) {
        throw new Error(err)
      }
    }

    async getRoutersByRole() {
      try {
        if (this.isKoreUser()) {
          return await sequelize.models.Router.findAll()
        } else if (this.roleId === 4) {
          const companies = await this.getCompaniesByRole()
          const companyIds = companies.map((company) => company.id)

          return await sequelize.models.Router.findAll({
            where: {
              companyId: {
                [Op.in]: companyIds
              }
            }
          })
        } else if (this.roleId === 5) {
          const company = await this.getCompany()

          return await company.getRouters()
        } else {
          return []
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    roleId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User'
  })

  return User
}