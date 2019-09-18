require('dotenv').config()

const config = {
  DB_URL: process.env.DB_URL,
  APP_PORT: process.env.PORT || 3000,
  API_URL: 'https://rickandmortyapi.com/api/character/',
  SCHEDULE_EXPRESSION: '0 */3 * * *'
}

module.exports = {
  config
}
