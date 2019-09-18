const formatData = ({ name, image, origin, dataVersion }) => ({
  name,
  image,
  origin: origin.name,
  version: dataVersion
})

module.exports = {
  formatData
}
