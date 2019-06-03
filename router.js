const router = require('koa-router')({ prefix: '/mpi' })
module.exports = app => {
  router.post('/test', app.controller.auth.test)
  router.post('/auth/logout', app.controller.auth.logout)
  router.post('/auth/checkToken', app.controller.auth.checkToken)
  router.post('/auth/GetUserBaseInfo', app.controller.auth.GetUserBaseInfo)
  router.post('/auth/menuTree', app.controller.auth.GetMenuTree)

  app.use(router.routes()).use(router.allowedMethods())
}
