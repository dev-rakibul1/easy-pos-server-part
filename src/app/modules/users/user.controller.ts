import { User } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { UserService } from './user.services'
import { userFilterableQuery } from './users.constant'

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
  const filters = pick(req.query, userFilterableQuery)

  const paginationOptions = pick(req.query, paginationQueryKeys)

  const result = await UserService.GetAllCreateUserService(
    filters,
    paginationOptions,
  )

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully!',
    meta: result.meta,
    data: result.data,
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
