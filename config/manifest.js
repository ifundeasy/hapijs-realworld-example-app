const config = require('./index')
const manifest = {
  server: {
    debug: { request: ['error'] }, // TODO: remove in production
    host: process.env.PORT ? '0.0.0.0' : 'localhost',
    port: process.env.PORT || 8080,
    routes: {
      cors: true
    }
  },
  register: {
    plugins: [
      { plugin: 'blipp' },
      { plugin: 'hapi-auth-jwt2' },
      { plugin: '@hapi/inert' },
      { plugin: '@hapi/vision' },
      { plugin: 'hapi-swagger', options: config.swagger },
      { plugin: './auth' },
      { plugin: './models' },
      { plugin: './services' },
      { plugin: './api', routes: { prefix: '/api' } }
    ]
  }
}

if (process.env.NODE_ENV !== 'test') {
  manifest.register.plugins.push({
    plugin: 'hapi-pino',
    options: {
      //
    }
  })
}

module.exports = manifest
