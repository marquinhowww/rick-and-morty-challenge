const mongoose = require('mongoose')

const { Schema } = mongoose

const CurrentVersionSchema = Schema({
  dataVersion: {
    type: String,
    required: true
  }
})

const CurrentVersion = mongoose.model('CurrentVersion', CurrentVersionSchema)

module.exports = {
  CurrentVersion
}
