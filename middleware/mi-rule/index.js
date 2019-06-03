const Path = require('path')
const fs = require('fs')
module.exports = function(opts) {
  const { app, rules = [] } = opts
  if (!app) {
    throw new Error('the app params is necessary!')
  }
  const appKeys = Object.keys(app)
  rules.forEach(item => {
    const { path, name } = item
    if (appKeys.includes(name)) {
      throw new Error(`the name of ${name} already exists!`)
    }
    const content = {}
    fs.readdirSync(path).forEach(filename => {
      const extname = Path.extname(filename)
      if (extname === '.js') {
        const name = Path.basename(filename, extname)
        content[name] = require(Path.join(path, filename))
      }
    })
    app[name] = content
  })
}
