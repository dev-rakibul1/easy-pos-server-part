import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ColorService } from './color.services'

// Create a color
const CreateColorController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await ColorService.CreateColorService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Color added success!',
      data: result,
    })
  },
)

// get all color
const GetAllColorController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ColorService.GetAllColorService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Color get successfully!',
      data: result,
    })
  },
)

export const ColorController = {
  CreateColorController,
  GetAllColorController,
}
