const { models, pagination } = require('../../../database')
const { logger } = require('../../../services')

const { Character, CurrentVersion } = models
const { buildPaginationParams, calculateTotalPages } = pagination

const getCurrentVersion = async () => {
  const { dataVersion } = await CurrentVersion.findOne()

  return dataVersion
}

const list = async (req, res) => {
  try {
    const { page, limit, skip, search, sort } = buildPaginationParams({
      query: req.query
    })

    const curretDataVersion = await getCurrentVersion()

    const pipelines = []

    if (search) {
      pipelines.push({
        $match: {
          $text: {
            $search: search,
            $language: 'en'
          }
        }
      })
    }

    const basePipeline = [
      {
        $match: {
          version: curretDataVersion
        }
      },
      {
        $group: {
          _id: '$name',
          dimensions_count: { $sum: 1 },
          image: {
            $last: '$image'
          }
        }
      },
      {
        $project: {
          image: '$image',
          name: '$_id',
          dimensions_count: '$dimensions_count',
          _id: 0
        }
      },
      {
        $facet: {
          data: [
            { $sort: { dimensions_count: sort } },
            { $skip: skip },
            { $limit: limit }
          ],
          pageInfo: [
            { $group: { _id: null, count: { $sum: 1 } } }
          ]
        }
      }
    ]

    pipelines.push(...basePipeline)

    const [result] = await Character.aggregate(pipelines)

    const [paginationInfo] = result.pageInfo

    const totalPages = calculateTotalPages({
      paginationInfo,
      limit
    })

    res.send({
      data: result.data,
      pagination: {
        page,
        limit,
        totalPages
      }
    })
  } catch (error) {
    logger.error(__filename, error)
    res.send(400, {
      message: 'Ops.. something is wrong'
    })
  }
}

module.exports = {
  list
}
