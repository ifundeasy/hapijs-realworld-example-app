const register = async (server, options) => {
  const services = [].concat(
    require('./users'),
    require('./articles'),
    require('./comments'),
    require('./tags')
  )
  server.method(services)
}

const plugin = {
  register,
  pkg: require('./package.json')
}

module.exports = plugin
