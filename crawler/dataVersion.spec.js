const { models } = require('../database')
const { removeOldVersionData, updateDataVersion } = require('./dataVersion')

const { CurrentVersion, Character } = models

const currentVersion = 'fake-currentVersion'

describe('dataVersion', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  it('should removeOldVersionData', async () => {
    const deleteManySpy = jest.spyOn(Character, 'deleteMany')
      .mockImplementation(() => { })

    await removeOldVersionData({ currentVersion })

    expect(deleteManySpy).toBeCalledTimes(1)
    expect(deleteManySpy).toBeCalledWith({
      version: { $ne: currentVersion }
    })
  })

  it('should updateDataVersion', async () => {
    const set = jest.fn()
    const save = jest.fn()

    const findOneSpy = jest.spyOn(CurrentVersion, 'findOne')
      .mockImplementation(() => {
        return Promise.resolve({
          set,
          save
        })
      })

    await updateDataVersion({ newVersion: currentVersion })

    expect(findOneSpy).toBeCalledTimes(1)
    expect(save).toBeCalledTimes(1)
    expect(set).toBeCalledTimes(1)
    expect(set).toBeCalledWith('dataVersion', currentVersion)
  })
})
