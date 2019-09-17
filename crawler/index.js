const { Character } = require('../database/models')
const axios = require('axios')

const start = async () => {
  console.log('hello world')
}

start()
  .then(_ => process.exit())
  .catch(_ => process.exit(1))
