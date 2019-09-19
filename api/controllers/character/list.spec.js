const { list } = require('./list')
const { models } = require('../../../database')

const { Character, CurrentVersion } = models

describe('character/list', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()

    jest.spyOn(CurrentVersion, 'findOne')
      .mockImplementation(() => {
        return {
          dataVersion: 'fakeversion'
        }
      })
  })

  it('should add $match pipeline on pipelines', async () => {
    const aggregateSpy = jest.spyOn(Character, 'aggregate')
      .mockImplementation(() => [
        {
          pageInfo: []
        }
      ])

    const send = jest.fn()
    const res = { send }

    const search = 'Evil Enzo'
    const req = {
      query: { search }
    }

    await list(req, res)

    const pipelines = aggregateSpy.mock.calls[0][0]

    const matchPipeline = pipelines.find(
      pipeline => pipeline && pipeline.$match.$text.$search === search
    )

    expect(aggregateSpy).toBeCalledTimes(1)
    expect(send).toBeCalledTimes(1)
    expect(matchPipeline).toBeDefined()
  })

  it('should call send with paginate info', async () => {
    const aggregateSpy = jest.spyOn(Character, 'aggregate')
      .mockImplementation(() => [
        {
          data: [],
          pageInfo: []
        }
      ])

    const send = jest.fn()
    const res = { send }

    const req = {
      query: {}
    }

    await list(req, res)

    const expectedResponse = {
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 0
      }
    }

    expect(aggregateSpy).toBeCalledTimes(1)
    expect(send).toBeCalledTimes(1)
    expect(send).toBeCalledWith(expectedResponse)
  })

  it('should call send with error on exception', async () => {
    const aggregateSpy = jest.spyOn(Character, 'aggregate')
      .mockImplementation(() => {
        throw new Error('wubba lubba dub dub')
      })

    const send = jest.fn()
    const res = { send }

    const req = {
      query: {}
    }

    await list(req, res)

    const expectedResponse = {
      message: 'Ops.. something is wrong'
    }

    expect(aggregateSpy).toBeCalledTimes(1)
    expect(send).toBeCalledTimes(1)
    expect(send).toBeCalledWith(400, expectedResponse)
  })
})
