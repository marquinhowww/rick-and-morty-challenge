require('dotenv').config()

const config = {
  DB_URL: process.env.DB_URL,
  API_URL: 'https://rickandmortyapi.com/api/character/',
  SCHEDULE_EXPRESSION: '0 */3 * * *'
}

module.exports = {
  config
}
