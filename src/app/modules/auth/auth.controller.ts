import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config/config'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.services'
import { IUserLoginResponse } from './auth.type'

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

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: others,
  })
})

export const LoginController = {
  LoginUser,
}
