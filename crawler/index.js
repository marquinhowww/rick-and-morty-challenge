const { config } = require('../config')
const { connect } = require('../database')
const { load } = require('./dataLoader')
const { logger } = require('../services')
const { updateDataVersion, removeOldVersionData } = require('./dataVersion')
const cron = require('node-cron')
const uuid = require('uuid/v4')

cron.schedule(config.SCHEDULE_EXPRESSION, async () => {
  try {
    const dataVersion = uuid()

    await connect()
    await load({ dataVersion })

    await updateDataVersion({ newVersion: dataVersion })
    await removeOldVersionData({ currentVersion: dataVersion })

    logger.info('Load completed')
  } catch (error) {
    logger.error(error)
  }
}
