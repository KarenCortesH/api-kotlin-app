const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send(new Date())
})

router.use('/api/users', require('../modules/users/user.routes'))

module.exports = router
