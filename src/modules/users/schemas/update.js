const joi = require('@hapi/joi')

const schema = {
  params: {
    id: joi.number().min(1).required()
  },
  body: {
    fullName: joi.string().min(1).max(50),
    phone: joi.string().min(1).max(10),
    contactPhone: joi.string().min(1).max(10)
  }
}

module.exports = {
  schema
}
