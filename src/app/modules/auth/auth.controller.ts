import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config/config'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.services'

// Login
const LoginUser = CatchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body

  const result = await AuthService.LoginUserService(loginData)
  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: others,
  })
})

// Refresh token
const RefreshToken = CatchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const result = await AuthService.RefreshTokenService(refreshToken)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: result,
  })
})

// Login
const WebLoginUser = CatchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body

  const result = await AuthService.WebLoginUserService(loginData)
  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: others,
  })
})

export const LoginController = {
  LoginUser,
  RefreshToken,
  WebLoginUser,
}
