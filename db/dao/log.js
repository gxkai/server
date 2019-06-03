const { Log } = require('../model')
module.exports = {
  add: async log => {
    return Log.create(log)
  }
}
