
const getNumberParam = ({ value, defaultValue }) =>
  value ? Number(value) : defaultValue

const buildPaginationParams = ({ query }) => {
  const page = getNumberParam({ value: query.page, defaultValue: 1 })
  const limit = getNumberParam({ value: query.limit, defaultValue: 10 })
  const skip = (limit * page) - limit

  const sort = query.sort === 'asc' ? 1 : -1

  const { search } = query

  return {
    page,
    limit,
    skip,
    search,
    sort
  }
}

const calculateTotalPages = ({ paginationInfo, limit }) =>
  paginationInfo &&
    paginationInfo.count !== undefined
    ? Math.ceil(paginationInfo.count / limit) : 0

module.exports = {
  buildPaginationParams,
  getNumberParam,
  calculateTotalPages
}
