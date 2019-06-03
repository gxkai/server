const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const session = require('koa-session')
const cors = require('@koa/cors')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')

// 引入规则中件间
const miRule = require('./mi-rule')

module.exports = app => {
  app.use(miHttpError())
  app.use(
    miLog({
      env: app.env,
      projectName: 'mes',
      appLogLevel: 'debug',
      dir: 'logs',
      serverIp: ip.address()
    })
  )
  app.use(
    cors({
      origin: '*'
    })
  )

  app.use(staticFiles(path.resolve(__dirname, '../public')))

  app.use(
    nunjucks({
      ext: 'html',
      path: path.join(__dirname, '../views'),
      nunjucksConfig: {
        trimBlocks: true
      }
    })
  )

  app.use(bodyParser())

  // session
  // session
  app.keys = ['some session']

  const CONFIG = {
    key: 'SESSION' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  }
  app.use(session(CONFIG, app))
  app.use(miSend())

  miRule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        path: path.join(__dirname, '../service'),
        name: 'service'
      },
      {
        path: path.join(__dirname, '../db/dao'),
        name: 'dao'
      },
      {
        path: path.join(__dirname, '../lib'),
        name: 'lib'
      }
    ]
  })

  // app.use(async (ctx, next) => {
  //   const token = ctx.request.query.token
  //   if (token) {
  //     ctx.session.token = token
  //     const authUser = await app.service.auth.GetUserBaseInfo(ctx)
  //     const authMenu = await app.service.auth.GetAuthMenu(ctx)
  //     ctx.session.authUser = authUser
  //     ctx.session.authMenu = authMenu
  //   }
  //   await next()
  // })

  // 增加错误的监听处理
  // app.on('error', (err, ctx) => {
  //   if (ctx && !ctx.headerSent && ctx.status < 500) {
  //     ctx.status = 500
  //   }
  //   if (ctx && ctx.log && ctx.log.error) {
  //     if (!ctx.state.logged) {
  //       ctx.log.error(err.stack)
  //     }
  //   }
  // })
}
