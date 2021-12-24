const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
    
  next()
}

const userExtractor = (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    request.user = null
  } else {
    request.user = decodedToken
  }
  next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
        error: 'invalid token'
        })
    }
}

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}