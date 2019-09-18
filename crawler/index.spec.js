const { config } = require('../config')
const cron = require('node-cron')

describe('crawler', () => {
  it('should be a valid SCHEDULE_EXPRESSION', () => {
    expect(cron.validate(config.SCHEDULE_EXPRESSION)).toBeTruthy()
  })
})
