const { models } = require('../database')

const { CurrentVersion, Character } = models

const updateDataVersion = async ({ newVersion }) => {
  const currentVersion = await CurrentVersion.findOne({})

  if (!currentVersion) {
    const firstVersion = new CurrentVersion({
      dataVersion: newVersion
    })

    return firstVersion.save()
  }

  currentVersion.set('dataVersion', newVersion)

  return currentVersion.save()
}

const removeOldVersionData = async ({ currentVersion }) => {
  return Character.deleteMany({
    version: { $ne: currentVersion }
  })
}

module.exports = {
  updateDataVersion,
  removeOldVersionData
}
