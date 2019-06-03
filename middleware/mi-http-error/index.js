module.exports = (opts = {}) => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      ctx.status = e.status || 400
      ctx.body = { msg: e.toString() }
    }
  }
}
