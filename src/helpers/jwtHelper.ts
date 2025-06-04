import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  // @ts-ignore
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}

const verifyJwtToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const jwtTokenProvider = {
  createToken,
  verifyJwtToken,
}
