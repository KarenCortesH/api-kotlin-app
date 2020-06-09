const { TwilioPlugin } = require('../../plugins/twilio.plugin')
const { DataBasePlugin } = require('../../plugins/database.plugin')
const { firebaseAdminPlugin } = require('../../plugins/firebase-admin.plugin')

const { throwError } = require('../../utils')

class UserService {
  constructor () {
    this.dataBasePlugin = new DataBasePlugin()
    this.firebaseAdminPlugin = firebaseAdminPlugin
    this.twilioPlugin = new TwilioPlugin({})
  }

  async create ({ user = {} }) {
    const created = await this.dataBasePlugin.createOne({
      tableName: 'users',
      objectToCreate: {
        ...user
      }
    })

    return created
  }

  async getAll ({ limit, skip }) {
    return []
  }

  async getOne ({ attributes = {} }) {
    const user = await this.dataBasePlugin.getOne({
      tableName: 'users',
      attributes
    })

    return user
  }

  async update ({ id, user = {} }) {
    const updated = await this.dataBasePlugin.updateOne({
      tableName: 'users',
      id,
      objectToUpdate: {
        ...user
      }
    })

    return updated
  }

  async delete ({ id }) {
    return { id }
  }

  async register ({ user }) {
    const userInFirebase = await this.firebaseAdminPlugin.createUser({
      email: user.email,
      password: user.password
    })

    // console.log('userInFirebase', userInFirebase)

    const userToSave = {
      ...user,
      authUid: userInFirebase.uid
    }
    delete userToSave.password

    const created = await this.create({
      user: {
        ...userToSave
      }
    })

    return created
  }

  async sendAlert ({ email }) {
    const user = await this.getOne({
      attributes: {
        email
      }
    })

    if (!user) {
      throw throwError({
        errorMessage: `can't get the user with email ${email}.`,
        statusCode: 404
      })
    }

    const { fullName, contactPhone } = user

    const message = `${fullName} necesita de tu ayuda.`

    await this.twilioPlugin.sendMessage({
      body: message,
      to: `+57${contactPhone}`
    })
  }
}

module.exports = {
  UserService
}
