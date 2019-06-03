module.exports = {
  lastModified(schema, options) {
    schema.add({ lastMod: Date })
    schema.pre('save', function(next) {
      this.lastMod = new Date()
      next()
    })
    schema.post('init', function(doc) {
      console.log('%s has been initialized from the db', doc._id)
    })

    schema.post('validate', function(doc) {
      console.log('%s has been validated (but not saved yet)', doc._id)
    })

    schema.post('save', function(doc) {
      console.log('%s has been saved', doc._id)
    })

    schema.post('remove', function(doc) {
      console.log('%s has been removed', doc._id)
    })
  }
}
