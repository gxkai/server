module.exports = {
  test: async (ctx, next) => {
    const { app } = ctx
    const a = await app.dao.test.transation(ctx)
    ctx.body = a
    ctx.status = 200
  },
  logout: async (ctx, next) => {
    ctx.session.token = null
    ctx.status = 200
  },
  checkToken: async (ctx, next) => {
    const { app } = ctx
    await app.service.auth.CheckToken(ctx)
    ctx.status = 200
  },
  GetUserBaseInfo: async (ctx, next) => {
    const { app } = ctx
    const result = await app.service.auth.GetUserBaseInfo(ctx)
    ctx.body = result
    ctx.status = 200
  },
  GetResourceList: async (ctx, next) => {
    const { app } = ctx
    const result = await app.service.auth.GetResourceList(ctx)
    ctx.body = result
    ctx.status = 200
  },
  GetMenuTree: async (ctx, next) => {
    const { app } = ctx
    const result = await app.service.auth.GetMenuTree(ctx)
    ctx.body = result
    ctx.status = 200
  }
}
