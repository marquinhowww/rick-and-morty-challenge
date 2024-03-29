const mongoose = require('mongoose')

const { Schema } = mongoose

const CharacterSchema = Schema({
  name: {
    type: String,
    required: true,
    text: true
  },
  image: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  }
})

const Character = mongoose.model('Character', CharacterSchema)

module.exports = {
  Character
}
