const { list } = require('./list')

const routes = server => {
  server.get('/count', list)
}

module.exports = {
  routes
}
