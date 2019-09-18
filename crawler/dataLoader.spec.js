const { config } = require('../config')
const { http } = require('../services')
const { models } = require('../database')
const dataLoader = require('./dataLoader')

const { Character } = models

const dataVersion = 'fake-uuid-v4'

describe('dataLoader', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()

    jest.spyOn(Character, 'insertMany')
      .mockImplementation(() => { })
  })

  it('should use the default API URL if not provided', async () => {
    const httpGetSpy = jest.spyOn(http, 'get')
      .mockImplementation(() => ({ data: {} }))

    await dataLoader.load({ dataVersion })

    expect(httpGetSpy).toBeCalledTimes(1)
    expect(httpGetSpy).toHaveBeenCalledWith(config.API_URL)
  })

  it('should call load recursively if possible', async () => {
    const fakeURL = 'http:fakenexturl.com'
    const httpGetSpy = jest.spyOn(http, 'get')
      .mockImplementationOnce(() => ({
        data: {
          info: {
            next: fakeURL
          }
        }
      }))
      .mockImplementationOnce(() => ({
        data: {}
      }))

    await dataLoader.load({ dataVersion })

    expect(httpGetSpy).toBeCalledTimes(2)
    expect(httpGetSpy).toBeCalledWith(config.API_URL)
    expect(httpGetSpy).toBeCalledWith(fakeURL)
  })

  it('should call insertMany with formated data', async () => {
    const name = 'Evil Enzo'
    const image = 'http://image.com/enzo'
    const originName = 'Earth 2012'

    const httpGetSpy = jest.spyOn(http, 'get')
      .mockImplementationOnce(() => ({
        data: {
          results: [{
            name,
            image,
            origin: {
              name: originName
            }
          }]
        }
      }))

    const insertManySpy = jest.spyOn(Character, 'insertMany')
      .mockImplementation(() => { })

    await dataLoader.load({ dataVersion })

    const expectArgument = [{
      name,
      image,
      origin: originName,
      version: dataVersion
    }]

    expect(httpGetSpy).toBeCalledTimes(1)
    expect(httpGetSpy).toBeCalledWith(config.API_URL)
    expect(insertManySpy).toBeCalledTimes(1)
    expect(insertManySpy).toBeCalledWith(expectArgument)
  })
})
