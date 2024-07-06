import { Returns } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ReturnService } from './return.services'

// Create a return
const CreateReturnController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await ReturnService.CreateReturnService(payload)

    sendResponse<Returns | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product return success!',
      data: result,
    })
  },
)

// get all return
const GetAllReturnController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ReturnService.GetAllReturnService()

    sendResponse<Returns[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All return product get successfully!',
      data: result,
    })
  },
)
// get all return
const GetAllReturnByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ReturnService.GetAllReturnByCurrentDateService()

    sendResponse<Returns[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All return product get by current date!',
      data: result,
    })
  },
)

export const ReturnController = {
  CreateReturnController,
  GetAllReturnController,
  GetAllReturnByCurrentDateController,
}
