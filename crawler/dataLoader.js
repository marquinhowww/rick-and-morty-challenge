const { config } = require('../config')
const { models } = require('../database')
const { formatData } = require('./formatData')
const { logger, http } = require('../services')

const { Character } = models

const load = async ({ curretURL = config.API_URL } = {}) => {
  logger.info('Current URL', curretURL)

  const { data } = await http.get(curretURL)

  const containsResults = data && data.results
  if (containsResults) {
    const formatedData = data.results.map(formatData)
    await Character.insertMany(formatedData)
  }

  const nextURL = data.info && data.info.next
  if (nextURL) {
    return load({ curretURL: nextURL })
  }

  logger.info('Load completed')
}

module.exports = {
  load
}
