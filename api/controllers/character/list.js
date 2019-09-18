const list = (req, res, next) => {
  res.send({ hello: 'world' })
  next()
}

module.exports = {
  list
}
