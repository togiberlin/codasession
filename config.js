'use strict';

module.exports = {
  mailer: {
    service: 'Gmail',
    auth: {
      // In production, use environment variables
      // It's best practice to store them in a .env file and
      // put the .env on .gitignore
      user: 'your_gmail_account_here',
      pass: 'your_pw_comes_here'
    }
  },
  dbConnString: 'mongodb://127.0.0.1:27017/codasession',
  sessionKey: 'CodaSessionYolomatic',
  facebook: {
    appID: '288781154956462',
    appSecret: '290b1a5697c8b3a34f1b688ec0098499'
  }
}
