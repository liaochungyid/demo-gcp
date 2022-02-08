require('dotenv').config()

const PORT = process.env.PORT || 8080

const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')

const app = express()

app.engine( 'hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
)

require('./routes')(app)

module.exports = app