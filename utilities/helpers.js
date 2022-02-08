const { createHmac } = require('crypto')
require('dotenv').config()
const { Data } = require('../models')

module.exports = {
  hash: (data) => {
    return createHmac('sha256', process.env.PASSWORD_HASH_SECRET).update(data).digest('hex')
  },

  compareHash: (raw, hash) => {
    return createHmac('sha256', process.env.PASSWORD_HASH_SECRET).update(raw).digest('hex') === hash
  },

  getData: async (target, req) => {
    let UserId = req.user.id
    let data
    if (req.user.account === 'root') {
      data = await Data.findAll({raw: true, attributes: [target, 'createdAt', 'updatedAt']})
    } else {
      data = await Data.findAll({
        where: [{UserId}],
        raw: true,
        attributes: [target, 'createdAt', 'updatedAt']
      })
    }
    
    data = data.map(d => {
      d.createdAt = d.createdAt.toLocaleString('zh-TW')
      d.updatedAt = d.updatedAt.toLocaleString('zh-TW')
      return d
    })

    return data
  },
}