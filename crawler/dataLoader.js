const { config } = require('../config')
const { models } = require('../database')
const { formatData } = require('./formatData')
const { logger, http } = require('../services')

const { Character } = models

const load = async ({ curretURL = config.API_URL, dataVersion } = {}) => {
  logger.info('Loading data', { curretURL, dataVersion })

  const { data } = await http.get(curretURL)

  const containsResults = data && data.results
  if (containsResults) {
    const formatedData = data.results.map(
      result => formatData({ ...result, dataVersion })
    )

    await Character.insertMany(formatedData)
  }

  const nextURL = data.info && data.info.next
  if (nextURL) {
    return load({ curretURL: nextURL, dataVersion })
  }
}

module.exports = {
  load
}
