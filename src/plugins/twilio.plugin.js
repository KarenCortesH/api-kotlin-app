const twilio = require('twilio')
const environment = require('../environment')

class TwilioPlugin {
  constructor ({ accountSID = undefined, authToken = undefined }) {
    this.client = twilio(accountSID || process.env.TWILIO_ACCOUNT_SID, authToken || process.env.TWILIO_AUTH_TOKEN)
  }

  async sendMessage ({ body, to }) {
    // get the twilio number
    const from = await environment.TWILIO_NUMBER

    console.log('from', from)

    // send the message
    const message = await this.client.messages.create({
      body,
      from,
      to
    })

    return message.sid
  }
};

module.exports = {
  TwilioPlugin
}
