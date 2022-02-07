const passport = require('passport')
const LocalStrategy = require('passport-local')
const helpers = require('../utilities/helpers')
const db = require('../models')
const { User } = db

passport.use(
  new LocalStrategy(
    {
      usernameField: 'account',
      passwordField: 'password',
    },
    async (account, password, done) => {
      try {
        const user = await User.findOne({ where: { account } })

        if ( !user ) {
          return done(null, false, { message: '帳號不存在'})
        }

        if (!helpers.compareHash(password, user.password)) {
          return done(null, false, { message: '密碼錯誤！'})
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    })
    return done(null, user.toJSON())
  } catch (err) {
    console.error(err)
  }
})

module.exports = passport
