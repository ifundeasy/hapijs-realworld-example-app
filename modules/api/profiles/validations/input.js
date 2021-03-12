const Joi = require('joi')
const { HeadersPayLoad } = require('../../validations')
// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------

const ProfileParamsValidation = {
  headers: HeadersPayLoad.optional('Authorization'),
  params: Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9]+$/, 'alphanumeric').description('the user username').example('johndoe')
  })
}

module.exports = {
  ProfileParamsValidation
}
