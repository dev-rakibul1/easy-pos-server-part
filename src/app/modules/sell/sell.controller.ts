import { Sells } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
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
// get all sell by current week
const GetAllSellByCurrentWeekController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellService.GetAllSellByCurrentWeekService()

    sendResponse<Sells[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell get by current week.',
      data: result,
    })
  },
)
// get all sell by current month
const GetAllSellByCurrentMonthController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellService.GetAllSellByCurrentMonthService()

    sendResponse<Sells[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell get by current month.',
      data: result,
    })
  },
)
// get all sell by current year
const GetAllSellByCurrentYearController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellService.GetAllSellByCurrentYearService()

    sendResponse<Sells[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell get by current year.',
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
// get single sells
const GetSingleSellController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await SellService.GetSingleSellService(id)

    sendResponse<Sells | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single sell get success.',
      data: result,
    })
  },
)
// get single sells
const GetWarrantySellController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await SellService.GetWarrantySellService(id)

    sendResponse<Sells | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Warranty product get success.',
      data: result,
    })
  },
)

//filter by start date and end date controller
const GetFilterByStartEndDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query

    // Validate query parameters
    if (!startDate || !endDate) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'startDate and endDate are required.',
      )
    }

    const result = await SellService.GetFilterByStartEndDateService(
      startDate as string,
      endDate as string,
    )

    // Send response
    sendResponse<Sells[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sales filtering success!',
      data: result.data,
      // @ts-ignore
      meta: result?.meta,
    })
  },
)

export const SellController = {
  CreateSellController,
  GetAllSellController,
  GetAllSellByCurrentDateController,
  GetAllSellByCurrentWeekController,
  GetAllSellByCurrentMonthController,
  GetAllSellByCurrentYearController,
  SellGetByCustomerPurchaseIdController,
  GetSingleSellController,
  GetWarrantySellController,
  GetFilterByStartEndDateController,
}
