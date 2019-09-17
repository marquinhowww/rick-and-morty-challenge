const { connect } = require('../database')
const { load } = require('./dataLoader')
const { logger } = require('../services')

connect()
  .then(load)
  .then(_ => process.exit())
  .catch(err => logger.error(err))
