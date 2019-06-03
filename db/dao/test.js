const assert = require('assert')
const { Test } = require('../model')
const db = require(`mongoose`)
const Schema = db.Schema
module.exports = {
  add: async ctx => {
    const result = await Test.create({ name: `` }, err => {
      if (err) {
        ctx.body = err.errors
        ctx.status = 400
      }
    })
    return result
  },
  find: async ctx => {
    const result = await Test.find({ name: `111` }, err => {
      if (err) {
        ctx.body = err.errors
        ctx.status = 400
      }
    })
    return result
  },
  update: async ctx => {
    let test = new Test()
    let result = null
    test.name = ''
    test.validate(async err => {
      if (err) {
        ctx.body = err.errors
        ctx.status = 400
      } else {
        result = await Test.update({ name: `111` }, { name: name })
        return result
      }
    })
  },
  transation: async ctx => {
    const Event = db.model(
      'Event',
      new Schema({ createdAt: Date }, { collection: `Event ` })
    )
    let session = null
    let result = await Event.createCollection()
      .then(() => db.startSession())
      .then(_session => {
        session = _session
        session.startTransaction()
        return Event.insertMany(
          [
            { createdAt: new Date('2018-06-01') },
            { createdAt: new Date('2018-06-02') },
            { createdAt: new Date('2017-06-01') },
            { createdAt: new Date('2017-05-31') }
          ],
          { session: session }
        )
      })
      .then(res => {
        session.commitTransaction()
      })
    return result
  }
}
