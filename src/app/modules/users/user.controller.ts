import { User } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.services'

// Create a user
const CreateUserController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await UserService.CreateUserService(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully!',
    data: result,
  })
})

// get all user
const GetAllUserController = CatchAsync(async (req: Request, res: Response) => {
  const result = await UserService.GetAllCreateUserService()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully!',
    data: result,
  })
})
// Update user
const UpdateUserController = CatchAsync(async (req: Request, res: Response) => {
  const payloads = req.body
  const { id } = req.params

  const result = await UserService.UpdateUserService(id, payloads)

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated success!',
    data: result,
  })
})

export const UserController = {
  CreateUserController,
  GetAllUserController,
  UpdateUserController,
}
