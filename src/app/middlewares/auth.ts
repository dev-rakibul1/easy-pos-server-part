import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { PAYLOADS } from '../../enums/role'
import ApiError from '../../errors/apiError'
import { jwtTokenProvider } from '../../helpers/jwtHelper'

const Auth =
  (...requireRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      // verify token
      let verifyUser = null

      verifyUser = jwtTokenProvider.verifyJwtToken(
        token,
        PAYLOADS.ACCESS_TOKEN as Secret,
      )

      req.user = verifyUser

      if (requireRole.length && !requireRole.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden user')
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export const AuthProvider = {
  Auth,
}
