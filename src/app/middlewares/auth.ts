import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { Secret } from 'jsonwebtoken'
import { PAYLOADS } from '../../enums/role'
import ApiError from '../../errors/apiError'
import { jwtTokenProvider } from '../../helpers/jwtHelper'
import prisma from '../../shared/prisma'

type ITokenObj = {
  uniqueId: string
  role: string
  status: boolean
  iat: number
  exp: number
}

const Auth =
  (...requireRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'You are not authorized',
      })
    }

    let decoded: ITokenObj

    try {
      decoded = jwt.decode(token) as ITokenObj

      if (!decoded) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
      }

      const isTokenExpired = (decoded: ITokenObj) => {
        const currentTime = Math.floor(Date.now() / 1000)
        return currentTime > decoded.exp
      }

      if (isTokenExpired(decoded)) {
        await prisma.user.update({
          where: { uniqueId: decoded.uniqueId },
          data: { status: false },
        })

        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'Token is expired. Please log in again.',
        )
      }

      // Verify token
      const verifyUser = jwtTokenProvider.verifyJwtToken(
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
