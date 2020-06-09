const joi = require('@hapi/joi')

const schema = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    fullName: joi.string().min(1).max(50).required(),
    phone: joi.string().min(1).max(10).required(),
    contactPhone: joi.string().min(1).max(10).required()
  }
}

module.exports = {
  schema
}
