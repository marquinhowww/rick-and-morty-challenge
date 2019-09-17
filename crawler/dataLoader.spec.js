const { config } = require('../config')
const { http } = require('../services')
const { models } = require('../database')
const dataLoader = require('./dataLoader')

const { Character } = models

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

    await dataLoader.load()

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

    await dataLoader.load()

    expect(httpGetSpy).toBeCalledTimes(2)
    expect(httpGetSpy).toBeCalledWith(config.API_URL)
    expect(httpGetSpy).toBeCalledWith(fakeURL)
  })
})
