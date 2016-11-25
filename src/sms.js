const Nexmo = require('nexmo')
const stories = require('./stories')

module.exports = function sms (apiKey, apiSecret, nexmoNumber) {
  const nexmo = new Nexmo({ apiKey, apiSecret }, { debug: true })

  const sendSMS = (recipient, message) => nexmo.message.sendSms(nexmoNumber, recipient, message)

  return {
    sendHeadlines: (recipient) => {
      nexmo.numberInsight.get({ level: 'basic', number: recipient }, (_, result) => {
        sendSMS(recipient, `Today's headlines
${stories.formatList(stories.all(result.country_code))}
Reply with MORE followed by the story number to read more`)
      })
    },

    sendFullStory: (recipient, storyNumber) => {
      nexmo.numberInsight.get({ level: 'basic', number: recipient }, (_, result) => {
        const story = stories.get(result.country_code, parseInt(storyNumber, 10))

        if (story) {
          sendSMS(recipient, stories.format(story))
        }
      })
    }
  }
}
