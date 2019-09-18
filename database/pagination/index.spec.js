const { buildPaginationParams } = require('./')

describe('pagination', () => {
  it('should build skip param', () => {
    const fakeQuery = {
      page: 2,
      limit: 2
    }

    const expectedSkip = 2
    const result = buildPaginationParams({ query: fakeQuery })

    expect(result.skip).toEqual(expectedSkip)
  })
})
