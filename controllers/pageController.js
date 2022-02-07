module.exports = {
  getBrowsePage: (req, res) => {
    return res.render('browse', {layout: false})
  },

  getContentPage: (req, res) => {
    return res.render('content', {layout: false})
  },

  getMediaPage: (req, res) => {
    return res.render('content', {layout: false})
  }
}