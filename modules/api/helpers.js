// --------------------------------------------------
//    Custom Error
// --------------------------------------------------

function CommentReferenceError (message) {
  this.name = 'CommentReferenceError'
  this.message = message || 'This comment does not belong to the given article !'
  this.stack = (new Error()).stack
}

CommentReferenceError.prototype = Object.create(Error.prototype)
CommentReferenceError.prototype.constructor = CommentReferenceError

// --------------------------------------------------
//    Helpers
// --------------------------------------------------

function joiResponseErrorHandler (err) {
  if (err.isJoi) {
    const response = {
      errors: {}
    }

    err.details.forEach((error) => {
      response.errors[error.context.key] = [error.message]
    })

    return response
  }

  return null
}

function defaultResponseErrorHandler (err) {
  const response = {
    errors: {}
  }

  response.errors[err.name] = [err.message]

  return response
}

function mongooseResponseValidationErrorHandler (err) {
  if (err.name && err.name === 'ValidationError') {
    const response = {
      errors: {}
    }

    const keys = Object.keys(err.errors)
    for (const index in keys) {
      const key = keys[index]
      if ({}.hasOwnProperty.call(err.errors[key], 'message')) {
        response.errors[key] = [`"${err.errors[key].value}" ${err.errors[key].message}`]
      }
    }

    return response
  }

  return null
}

const errorHandlers = [joiResponseErrorHandler, mongooseResponseValidationErrorHandler, defaultResponseErrorHandler]

const constructErrorResponse = (err) => {
  let response
  for (const handler in errorHandlers) {
    const handlerFn = errorHandlers[handler]
    if (typeof (handlerFn) === 'function') {
      response = handlerFn(err)
      if (response !== null) break
    }
  }
  return response
}

module.exports = {
  constructErrorResponse,
  CommentReferenceError
}
