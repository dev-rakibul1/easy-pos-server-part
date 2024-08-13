import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { PAYLOADS } from '../../../enums/role'
import ApiError from '../../../errors/apiError'
import { jwtTokenProvider } from '../../../helpers/jwtHelper'
import prisma from '../../../shared/prisma'
import { IAuthLoginTypes, IRefreshToken, IUserLoginResponse } from './auth.type'

// Login token
const LoginUserService = async (
  payload: IAuthLoginTypes,
): Promise<IUserLoginResponse> => {
  const { uniqueId, password } = payload

  // Find the user by uniqueId
  const user = await prisma.user.findUnique({
    where: { uniqueId },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.')
  }

  // Compare the provided password with the stored hashed password
  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Your password does not match.')
  }

  // Update the user's status to true
  await prisma.user.update({
    where: { uniqueId: user.uniqueId },
    data: { status: true },
  })

  // Generate access token
  const accessToken = jwtTokenProvider.createToken(
    {
      uniqueId: user?.uniqueId,
      role: user?.role,
      status: user?.status,
    },
    PAYLOADS.ACCESS_TOKEN as Secret,
    PAYLOADS.ACCESS_TOKEN_EXPIRE_IN as string,
  )

  // Generate refresh token
  const refreshToken = jwtTokenProvider.createToken(
    { uniqueId: user?.uniqueId, role: user?.role, status: user?.status },
    PAYLOADS.REFRESH_TOKEN as Secret,
    PAYLOADS.REFRESH_TOKEN_EXPIRE_IN as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

// Refresh token
const RefreshTokenService = async (token: string): Promise<IRefreshToken> => {
  let verifyToken = null

  try {
    verifyToken = jwtTokenProvider.verifyJwtToken(
      token,
      PAYLOADS.REFRESH_TOKEN as Secret,
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.')
  }

  const { uniqueId } = verifyToken

  const user = await prisma.user.findUnique({ where: { uniqueId } })
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.')
  }

  // Generate a new token
  const newAccessToken = jwtTokenProvider.createToken(
    {
      userId: user.uniqueId,
      role: user.role,
    },
    PAYLOADS.ACCESS_TOKEN as Secret,
    PAYLOADS.ACCESS_TOKEN_EXPIRE_IN as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  LoginUserService,
  RefreshTokenService,
}
