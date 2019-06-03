const axios = require('axios')
module.exports = {
  GetResourceList: async ctx => {
    const { app } = ctx
    const token = ctx.session.token
    const result = await axios.post(
      `http://ksat.luxshare-ict.com/passportapi/v1/GetResourceList`,
      {
        Token: token,
        AppID: `Lux.MES`,
        // Name: ``,
        ItemType: `other`,
        PageSize: 999
      }
    )
    const list = JSON.parse(result.data.Value)
      .items.filter(e => e.Name === 'menu')
      .map(e => JSON.parse(e.Remark))
    return list
  },
  GetUserBaseInfo: async ctx => {
    const token = ctx.session.token
    const result = await axios.post(
      `http://ksat.luxshare-ict.com/passportapi/v1/GetUserBaseInfo`,
      { token: token }
    )
    return JSON.parse(result.data.Value).User
  },
  CheckToken: async ctx => {
    const token = ctx.session.token
    await axios.post(`http://ksat.luxshare-ict.com/passportapi/v1/CheckToken`, {
      token: token
    })
  },
  GetRoleDetail: async ctx => {
    const token = ctx.session.token
    const result = await axios.post(
      `http://ksat.luxshare-ict.com/passportapi/v1/GetRoleDetail`,
      {
        Token: token,
        AppId: 'Lux.MES',
        pageSize: 999,
        Status: 1
      }
    )
    console.log(result)
  },
  GetMenuTree: async ctx => {
    const { app } = ctx
    const list = await app.service.auth.GetResourceList(ctx)
    const jsonTree = app.lib.util.getJsonTree(list, 0)
    return jsonTree
  },
  GetAuthMenu: async ctx => {
    const { app } = ctx
    const list = await app.service.auth.GetResourceList(ctx)
    const menuList = list.map(e => e.url)
    return menuList
  }
}
