const { models } = require('../../../database')

const { Character } = models

const list = async (req, res, next) => {
  const characters = await Character.aggregate([
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
      $sort: {
        dimensions_count: -1
      }
    },
    {
      $project: {
        image: '$image',
        name: '$_id',
        dimensions_count: '$dimensions_count',
        _id: 0
      }
    }
  ])

  res.send({ characters })

  next()
}

module.exports = {
  list
}
