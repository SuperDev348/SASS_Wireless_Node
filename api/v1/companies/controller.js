const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const { User, Company, Role, Router, Profile } = require('../../../models')
const { secret } = require('../../../config/auth')

module.exports = {
  index: async (req, res) => {
    try {
      const companies = await req.user.getCompaniesByRole()

      res.status(200).send({
        data: companies
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  show: async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id)

      if (!company) {
        res.status(404).send({
          message: 'Company Not Found'
        })
      }

      res.status(200).send({
        data: company
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id)

      if (!company) {
        res.status(404).send({
          message: 'Company Not Found'
        })
      }

      try {
        await company.update({
          name: req.body.name || company.name,
          logoLink: req.body.logoLink || company.logoLink,
          logoType: req.body.logoType || company.logoType
        })

        res.status(200).send({
          message: 'Successfully Updated',
          data: company
        })
      } catch (err) {
        res.status(500).send({ message: err.message })
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  getAdmins: async (req, res) => {
    try {
      const companies = await req.user.getCompaniesByRole()
      const companyIds = companies.map((company) => company.id)

      const admins = await User.findAll({
        where: {
          companyId: {
            [Op.in]: companyIds
          }
        }, include: [{
          model: Company,
          as: 'company'
        }]
      })

      res.status(200).send({
        data: admins
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: err.message })
    }
  },

  add: async (req, res) => {
    try {
      let company
      const { user } = req

      if ([1, 2, 3].includes(user.roleId)) {
        company = await Company.create({
          name: req.body.name,
          crandleUsername: req.body.cradleUsername ? req.body.cradleUsername : null,
          crandlePassword: req.body.cradlePassword ? bcrypt.hashSync(req.body.cradlePassword, 8) : null
        })
      } else if (user.roleId === 4) {
        company = await Company.create({
          name: req.body.name,
          parentCompanyId: user.companyId
        })
      }

      res.status(201).send({
        data: company,
        message: 'Successfully created'
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  uploadLogo: (req, res) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/uploads/logos/')
      },

      // By default, multer removes file extensions so let's add them back
      filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    })

    let upload = multer({ storage: storage }).single('logo')

    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.file) {
        return res.send('Please select an image to upload');
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      req.user.getCompany().then((company) => {
        company.update({
          logo: req.file.filename,
          logoType: req.body.logoType || 2
        }).then(() => {
          res.status(200).send({
            message: 'Successfully uploaded',
            data: company
          })
        }).catch((err) => {
          res.send(err)
        })
      }).catch((err) => {
        res.send(err)
      })
    })
  },

  createWithDevices: async (req, res) => {
    let company

    try {
      if (req.body.isNewCompany) {
        company = await Company.create({
          name: req.body.companyName,
          crandleUsername: req.body.cradleUsername,
          crandlePassword: req.body.cradlePassword ? bcrypt.hashSync(req.body.cradlePassword, 8) : ''
        })
      } else {
        company = await Company.findByPk(req.body.id)

        if (!company) {
          res.status(404).send({
            message: 'Company Not Found'
          })
        }
      }

      const user = await User.create({
        username: req.body.adminName,
        email: req.body.adminEmail,
        password: bcrypt.hashSync('password', 8),
        roleId: 4,
        companyId: company.id
      })

      await Profile.create({
        userId: user.id
      })

      for(device of req.body.devices) {
        const r = await Router.findByPk(device.deviceId)

        if (r) {
          await r.update({
            companyId: company.id,
            sim1: device.sim1,
            sim2: device.sim2
          })
        }
      }

      res.send({
        message: 'Successfully created'
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  },

  updateWithDevices: async (req, res) => {
    const company = await Company.findByPk(req.body.id)

    if (!company) {
      res.status(404).send({
        message: 'Company Not Found'
      })
    }

    try {
      await company.update({
        name: req.body.name,
        crandleUsername: req.body.cradleUsername,
        crandlePassword: req.body.cradlePassword ? bcrypt.hashSync(req.body.cradlePassword, 8) : ''
      })

      for(device of req.body.devices) {
        const r = await Router.findByPk(device.deviceId)

        if (r) {
          await r.update({
            companyId: company.id,
            sim1: device.sim1,
            sim2: device.sim2
          })
        }
      }

      res.send({
        message: 'Successfully updated'
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}