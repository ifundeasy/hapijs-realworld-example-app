const Joi = require('joi')
const { validateOptions, HeadersPayLoad } = require('../../validations')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------

const LoginPayload = {
  payload: Joi.object().keys({
    user: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const RegisterPayload = {
  payload: Joi.object().keys({
    user: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const GetCurrentPayload = {
  headers: HeadersPayLoad,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

module.exports = {
  GetCurrentPayload,
  LoginPayload,
  RegisterPayload
}
