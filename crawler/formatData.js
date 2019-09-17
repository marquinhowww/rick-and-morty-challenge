const formatData = ({ name, image, origin }) => ({
  name,
  image,
  origin: origin.name
})

module.exports = {
  formatData
}
