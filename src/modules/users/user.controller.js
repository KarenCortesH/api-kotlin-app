const { UserService } = require('./user.service')

class UserController {
  /**
   *
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @memberof UserController
   */
  async register (req, res, next) {
    try {
      const service = new UserService()

      const { body } = req

      const created = await service.register({
        user: {
          ...body
        }
      })

      return res.status(201).json(created)
    } catch (error) {
      return next(error)
    }
  }

  /**
   *
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @memberof UserController
   */
  async update (req, res, next) {
    try {
      const service = new UserService()

      const { params: { id }, body } = req

      const updated = await service.update({
        id,
        user: {
          ...body
        }
      })

      return res.status(200).json(updated)
    } catch (error) {
      return next(error)
    }
  }

  /**
   *
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @memberof UserController
   */
  async sendAlert (req, res, next) {
    try {
      const service = new UserService()
      const { body: { email } } = req

      await service.sendAlert({
        email
      })

      return res.sendStatus(200)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = {
  userController: new UserController()
}
