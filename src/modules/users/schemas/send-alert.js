const joi = require('@hapi/joi')

const schema = {
  body: {
    email: joi.string().email().required()
  }
}

module.exports = {
  schema
}
