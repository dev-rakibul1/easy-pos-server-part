import { Sells } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { sellFilterableQuery } from './sell.constant'
import { SellService } from './sell.services'

// Create a sell
const CreateSellController = CatchAsync(async (req: Request, res: Response) => {
  const payloads = req.body

  const result = await SellService.CreateSellService(payloads)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales success!',
    data: result,
  })
})

// get all sell
const GetAllSellController = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, sellFilterableQuery)
  const paginationOptions = pick(req.query, paginationQueryKeys)

  const result = await SellService.GetAllSellService(filters, paginationOptions)

  sendResponse<Sells[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sell get successfully!',
    meta: result.meta,
    data: result.data,
  })
})
// get all sell by current date
const GetAllSellByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellService.GetAllSellByCurrentDateService()

    sendResponse<Sells[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell get by current date.',
      data: result,
    })
  },
)
// get all sell by current date
const SellGetByCustomerPurchaseIdController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await SellService.SellGetByCustomerPurchaseIdService(id)

    sendResponse<Sells | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell get by customer-purchase id.',
      data: result,
    })
  },
)

export const SellController = {
  CreateSellController,
  GetAllSellController,
  GetAllSellByCurrentDateController,
  SellGetByCustomerPurchaseIdController,
}
