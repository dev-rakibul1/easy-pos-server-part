import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { PAYLOADS } from '../../../enums/role'
import ApiError from '../../../errors/apiError'
import { jwtTokenProvider } from '../../../helpers/jwtHelper'
import prisma from '../../../shared/prisma'
import { IAuthLoginTypes, IUserLoginResponse } from './auth.type'

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

  // Generate access token
  const accessToken = jwtTokenProvider.createToken(
    {
      id: user?.uniqueId,
      role: user?.role,
    },
    PAYLOADS.ACCESS_TOKEN as Secret,
    PAYLOADS.ACCESS_TOKEN_EXPIRE_IN as string,
  )

  // Generate refresh token
  const refreshToken = jwtTokenProvider.createToken(
    { id: user?.uniqueId, role: user?.role },
    PAYLOADS.REFRESH_TOKEN as Secret,
    PAYLOADS.REFRESH_TOKEN_EXPIRE_IN as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

export const AuthService = {
  LoginUserService,
}
