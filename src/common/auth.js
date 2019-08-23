import jwt from 'express-jwt'
import config from '../config'

const { secret } = config.session

function getTokenFromHeader(req) {
  const { authorization = '' } = req.headers
  if (authorization) {
    const temp = authorization.split(' ')
    if (temp[0] === 'Token' || temp[0] === 'Bearer') {
      return temp[1]
    }
  } else if (req.query && req.query.token) {
    return req.query.token
  }

  return null
}

export default {
  // 什么作用，都做了什么
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }).unless({
    path: [], // '/api/user/login', '/api/user/create'],
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
}
