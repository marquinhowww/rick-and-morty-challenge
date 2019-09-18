const { config } = require('../config')
const restify = require('restify')
const { logger } = require('../services')
const { connect } = require('../database')

connect()

const { routes: loadCharacterRoutes } = require('./controllers/character/routes')

const server = restify.createServer()

loadCharacterRoutes(server)

server.get('/status', (req, res) => res.send('ok'))

server.listen(config.APP_PORT, () =>
  logger.info(`Running on ${config.APP_PORT}`))
