import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { DiscountService } from './discount.services'

// Create a Discount
const CreateDiscountController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await DiscountService.CreateDiscountService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discount added success!',
      data: result,
    })
  },
)

// get all Discount
const GetAllDiscountController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await DiscountService.GetAllDiscountService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discount get successfully!',
      data: result,
    })
  },
)

export const DiscountController = {
  CreateDiscountController,
  GetAllDiscountController,
}
