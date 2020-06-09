const express = require('express')
const router = express.Router()

const { validationHandler } = require('../../common/pre-handlers/validation.pre-handler')

const { schema: registerSchema } = require('./schemas/register')
const { schema: updateSchema } = require('./schemas/update')
const { schema: sendAlertSchema } = require('./schemas/send-alert')

const { userController } = require('./user.controller')

router.post(
  '/',
  validationHandler({ schema: registerSchema.body, check: 'body' }),
  userController.register
)

router.patch(
  '/:id',
  validationHandler({ schema: updateSchema.params, check: 'params' }),
  validationHandler({ schema: updateSchema.body, check: 'body' }),
  userController.update
)

router.post(
  '/send-alert',
  validationHandler({ schema: sendAlertSchema.body, check: 'body' }),
  userController.sendAlert
)

module.exports = router
