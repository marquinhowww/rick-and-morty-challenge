const { list } = require('./list')

const routes = server => {
  server.get('/', list)
}

module.exports = {
  routes
}
