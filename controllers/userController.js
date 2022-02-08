module.exports = {
  loginParser: (req, res, next) => {
    req.body = JSON.parse(Object.keys(req.body)[0])
    next()
  },

  login: (req, res) => {
    return res.status(200).send()
  },

  logout: (req, res) => {
    req.logout()
    return res.status(200).send()
  },
  
  getLoginPage: (req, res) => {
    return res.render('login', {layout: false})
  }
}