import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SellVariantService } from './sellVariants.services'

// Create a user
const CreateSellVariantController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await SellVariantService.CreateSellVariantService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell variant create successfully!',
      data: result,
    })
  },
)

// get all user
const GetAllSellVariantController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellVariantService.GetAllSellVariantService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell variant get successfully!',
      data: result,
    })
  },
)

export const SellVariantController = {
  CreateSellVariantController,
  GetAllSellVariantController,
}
