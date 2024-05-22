import { Colors } from '@prisma/client'
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

    sendResponse<Colors | null>(res, {
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

    sendResponse<Colors[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Color get successfully!',
      data: result,
    })
  },
)

// Update color
const UpdateColorController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const { id } = req.params

    const result = await ColorService.UpdateColorService(id, payload)

    sendResponse<Colors | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Color update successfully!',
      data: result,
    })
  },
)

export const ColorController = {
  CreateColorController,
  GetAllColorController,
  UpdateColorController,
}
