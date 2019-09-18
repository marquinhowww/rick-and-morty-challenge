const { formatData } = require('./formatData')

describe('formatData', () => {
  it('should format data', () => {
    const name = 'Evil Enzo'
    const image = 'http://image.com/enzo'
    const originName = 'Earth 2012'
    const dataVersion = '123'

    const rawData = {
      name,
      image,
      origin: {
        name: originName
      },
      dataVersion
    }

    const expected = {
      name,
      image,
      origin: originName,
      version: dataVersion
    }

    const result = formatData(rawData)

    expect(result).toMatchObject(expected)
  })
})
