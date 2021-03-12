const inputValidations = require('./validations/input')
const outputValidations = require('./validations/output')

module.exports = (server) => {
  const handlers = require('./handlers')(server)
  return [
    // Get current user
    {
      method: 'GET',
      path: '/user',
      config: {
        auth: 'jwt',
        validate: inputValidations.GetCurrentPayload,
        response: outputValidations.AuthOutputValidationConfig,
        description: 'Get the current user',
        tags: ['api', 'users']
      },
      handler: handlers.getCurrentUser
    },
    // Register
    {
      method: 'POST',
      path: '/user',
      config: {
        validate: inputValidations.RegisterPayload,
        response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'Register a user',
        tags: ['api', 'users']
      },
      handler: handlers.registerUser
    },
    // Login
    {
      method: 'POST',
      path: '/user/login',
      config: {

        response: outputValidations.AuthOnLoginOutputValidationConfig,
        description: 'Log in a user',
        tags: ['api', 'users']
      },
      handler: handlers.loginUser
    }
  ]
}
