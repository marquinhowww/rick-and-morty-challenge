const { Character } = require('../database/models')
const axios = require('axios')
const { config } = require('../config')
const { formatData } = require('./formatData')
const { connect } = require('../database')
const { logger } = require('../log')

const load = async ({ curretURL = config.API_URL } = {}) => {
  logger.info('Current URL', curretURL)

  const { data } = await axios.get(curretURL)

  const formatedData = data.results.map(formatData)

  await Character.insertMany(formatedData)

  const nextURL = data.info && data.info.next
  if (nextURL) {
    return load({ curretURL: nextURL })
  }
}

connect()
  .then(load)
  .then(_ => process.exit())
  .catch(err => console.log(err))
