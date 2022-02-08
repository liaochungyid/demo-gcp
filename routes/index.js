const routes = require('./routes')
const apis = require('./apis')

module.exports = (app) => {
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated(req)) return next()
    res.status(401).render('login',{ layout: false })
  }

  app.use('/', routes)
  app.use('/api', isAuthenticated, apis)
}
