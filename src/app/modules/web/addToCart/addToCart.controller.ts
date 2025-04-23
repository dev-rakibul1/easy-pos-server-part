import { AddToCart } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import { AddToCartService } from './addToCart.services'

// Create a add to cart controller
const CreateAddToCartController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await AddToCartService.CreateAddToCartService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product added to cart success!',
      data: result,
    })
  },
) // Get all add to cart controller
const GetAllAddToCartController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await AddToCartService.GetAllAddToCartService()

    sendResponse<AddToCart[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Add to cart get success!',
      data: result,
    })
  },
)

export const AddToCartController = {
  CreateAddToCartController,
  GetAllAddToCartController,
}
