import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { PurchaseService } from './purchase.services'

// Purchase product
const CreatePurchaseController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await PurchaseService.CreatePurchaseService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase successfully!',
      data: result,
    })
  },
)

// get all purchase
const GetAllPurchaseController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await PurchaseService.GetAllCreatePurchaseService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All purchase get successfully!',
      data: result,
    })
  },
)

export const PurchaseController = {
  CreatePurchaseController,
  GetAllPurchaseController,
}
