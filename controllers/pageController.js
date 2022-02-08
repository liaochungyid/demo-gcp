const helpers = require('../utilities/helpers')

module.exports = {
  getBrowsePage: async (req, res) => {
    const data = await helpers.getData('browse', req)
    return res.render('browse', {layout: false, data})
  },

  getContentPage: async (req, res) => {
    const data = await helpers.getData('content', req)
    return res.render('content', {layout: false, data})
  },

  getMediaPage: async (req, res) => {
    const data = await helpers.getData('media', req)
    return res.render('media', {layout: false, data}) 
  }
}