const API_KEY = process.env['API_KEY']
const API_SECRET = process.env['API_SECRET']
const NEXMO_NUMBER = '447520635487'

const app = require('express')()
const sms = require('./sms')(API_KEY, API_SECRET, NEXMO_NUMBER)

const APPLICATION_PORT = process.env['APPLICATION_PORT'] || 8080

app.get('/send/:recipient', (req, res) => {
  sms.sendHeadlines(req.params.recipient)
  res.send('ok')
})

app.get('/receive', (req, res) => {
  switch (req.query.keyword) {
    case 'MORE':
      sms.sendFullStory(req.query.msisdn, req.query.text.replace(/^MORE */i, ''))
      break

    case 'HEADLINES':
      sms.sendHeadlines(req.query.msisdn)
      break
  }

  res.send('ok')
})

app.listen(APPLICATION_PORT)
