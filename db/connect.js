const mongoose = require('mongoose')
module.exports = {
  open() {
    try {
      const name = `mongodb://139.196.102.55:27017/mes`
      const user = ``
      const password = ``
      mongoose.set('debug', true)
      console.log(process.env.NODE_ENV)
      console.log(`测试环境开启debug模式`)
      mongoose.connect(name, {
        user: user,
        password: password,
        useNewUrlParser: true,
        bufferMaxEntries: 0,
        autoReconnect: true,
        poolSize: 10
      })
      mongoose.plugin(require(`./plugin`).lastModified)
      const db = mongoose.connection
      db.on('error', error => {
        console.log(`MongoDB connecting failed: ${error}`)
      })
      db.once('open', () => {
        console.log('MongoDB connecting succeeded')
      })
      return db
    } catch (e) {
      console.log(`MongoDB connecting failed: ${e}`)
    }
  },
  close() {
    return mongoose.connection.close()
  }
}
