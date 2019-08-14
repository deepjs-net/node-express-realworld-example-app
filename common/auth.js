import jwt from 'express-jwt'
import config from '../config'

const { secret } = config.session

function getTokenFromHeader(req){
  const { authorization = '' } = req.headers;
  const temp = authorization.split(' ')
  if (temp[0] === 'Token' || temp[0] === 'Bearer') {
    return temp[1];
  }

  return null;
}

export default {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  })
}
