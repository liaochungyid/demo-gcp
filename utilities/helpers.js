const { createHmac } = require('crypto')
require('dotenv').config()
module.exports = {
  hash: (data) => {
    return createHmac('sha256', process.env.PASSWORD_HASH_SECRET).update(data).digest('hex')
  },

  compareHash: (raw, hash) => {
    return createHmac('sha256', process.env.PASSWORD_HASH_SECRET).update(raw).digest('hex') === hash
  }
}