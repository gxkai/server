const mongoose = require('mongoose')
const LogSchema = new mongoose.Schema({
  projectName: {
    type: String
  },
  serverIp: {
    type: String
  },
  method: {
    type: String
  },
  host: {
    type: String
  },
  message: {
    type: Object
  },
  created: {
    type: Date,
    default: Date.now
  }
})
const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '名字不能为空']
    }
  },
  {
    collection: `test`,
    versionKey: false,
    timestamps: { createdAt: 'created', updatedAt: 'updated' }
  }
)
module.exports = {
  Log: mongoose.model('log', LogSchema),
  Test: mongoose.model(`test`, TestSchema)
}
