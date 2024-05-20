import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { VariantService } from './variants.services'

// Create a variant
const CreateVariantsController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await VariantService.CreateVariantService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Variant create successfully!',
      data: result,
    })
  },
)

// get all variant
const GetAllVariantsController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await VariantService.GetAllCreateVariantService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Variant get successfully!',
      data: result,
    })
  },
)

// get all variant
const DeleteSingleVariantsController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await VariantService.DeleteSingleVariantService(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Variant delete successfully!',
      data: result,
    })
  },
)

export const VariantsController = {
  CreateVariantsController,
  GetAllVariantsController,
  DeleteSingleVariantsController,
}
