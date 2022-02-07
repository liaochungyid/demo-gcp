const routes = require('./routes')
const apis = require('./apis')

module.exports = (app) => {
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated(req)) return next()
    res.render('login',{ 
      layout: false,
      message: '請先登入！' 
    })
  }

  app.use('/', routes)
  app.use('/api', isAuthenticated,apis)
}
