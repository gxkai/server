import swaggerRouter from './routes/index'
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
const { open } = require(`./db/connect`)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const middleware = require('./middleware')

config.dev = !(app.env === 'production')
open()
app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods())
// middleware(app)
// router(app)
async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(async ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    ctx.req.session = ctx.session
    nuxt.render(ctx.req, ctx.res)
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
