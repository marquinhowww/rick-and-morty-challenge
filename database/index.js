const { config } = require('../config')
const mongoose = require('mongoose')

const connect = () =>
  mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

module.exports = {
  connect
}
