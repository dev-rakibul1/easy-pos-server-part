import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SellService } from './sell.services'

// Create a user
const CreateSellController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await SellService.CreateSellService(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sell success!',
    data: result,
  })
})

// get all user
const GetAllSellController = CatchAsync(async (req: Request, res: Response) => {
  const result = await SellService.GetAllSellService()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sell get successfully!',
    data: result,
  })
})

export const SellController = {
  CreateSellController,
  GetAllSellController,
}
