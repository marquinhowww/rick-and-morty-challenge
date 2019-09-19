const { config } = require('../config')
const { connect } = require('../database')
const { logger } = require('../services')
const corsMiddleware = require('restify-cors-middleware')
const restify = require('restify')

const cors = corsMiddleware({
  origins: [
    'http//*.petlove.com.br',
    'http://localhost:3002'
  ],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

connect()

const { routes: loadCharacterRoutes } = require('./controllers/character/routes')

const server = restify.createServer()

server.use(restify.plugins.queryParser())

server.pre(cors.preflight)
server.use(cors.actual)

loadCharacterRoutes(server)

server.get('/status', (req, res) => res.send('ok'))

server.listen(config.APP_PORT, () =>
  logger.info(`Running on ${config.APP_PORT}`))
