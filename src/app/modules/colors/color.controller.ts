import { Colors } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
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
    const filters = pick(req.query, ['searchTerm', 'name', 'colorCode'])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await ColorService.GetAllColorService(
      filters,
      paginationOptions,
    )

    sendResponse<Colors[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Color get successfully!',
      meta: result.meta,
      data: result.data,
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
// Delete color
const DeleteColorController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await ColorService.DeleteColorService(id)

    sendResponse<Colors | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Color Deleted successfully!',
      data: result,
    })
  },
)
// get single color
const GetSingleColorController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await ColorService.GetSingleColorService(id)

    sendResponse<Colors | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single color get successfully!',
      data: result,
    })
  },
)

export const ColorController = {
  CreateColorController,
  GetAllColorController,
  GetSingleColorController,
  UpdateColorController,
  DeleteColorController,
}
