import { SellGroups } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { SellGroupService } from './sellGroup.services'

// get all Sell Group
const GetAllSellGroupController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'uniqueId',
      'customerId',
      'userId',
    ])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await SellGroupService.GetAllSellGroupService(
      filters,
      paginationOptions,
    )

    sendResponse<SellGroups[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell group get successfully!',
      meta: result?.meta,
      data: result?.data,
    })
  },
)
// get all Sell Group by current date
const GetSellGroupByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'uniqueId',
      'customerId',
      'userId',
    ])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await SellGroupService.GetSellGroupByCurrentDateService(
      filters,
      paginationOptions,
    )

    sendResponse<SellGroups[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell group get by current date!',
      meta: result?.meta,
      data: result?.data,
    })
  },
)
// get all Sell Group by current week
const GetSellGroupByCurrentWeekController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellGroupService.GetSellGroupByCurrentWeekService()

    sendResponse<SellGroups[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell group get by current week!',
      data: result,
    })
  },
)
// get all Sell Group by current week
const GetSellGroupByCurrentMonthController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellGroupService.GetSellGroupByCurrentMonthService()

    sendResponse<SellGroups[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell group get by current month!',
      data: result,
    })
  },
)
// get all Sell Group by current year
const GetSellGroupByCurrentYearController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SellGroupService.GetSellGroupByCurrentYearService()

    sendResponse<SellGroups[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sell group get by current year!',
      data: result,
    })
  },
)
// get Single Sell Group
const SingleSellGroupController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SellGroupService.SingleSellGroupService(id)

    sendResponse<SellGroups | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single sell group get successfully!',
      data: result,
    })
  },
)
// get Single Sell Group
const SingleSellGroupGetByOwnIdController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SellGroupService.SingleSellGroupGetByOwnIdService(id)

    sendResponse<SellGroups | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single sell group get successfully!',
      data: result,
    })
  },
)

// Filter by start and end date
const FilterByStartAndEndDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query

    // Validate query parameters
    if (!startDate || !endDate) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'startDate and endDate are required.',
      )
    }

    const result = await SellGroupService.SalesGroupFilterByStartEndDateService(
      startDate as string,
      endDate as string,
    )

    // Send response
    sendResponse<SellGroups[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sales filtering success!',
      data: result.data,
      // @ts-ignore
      meta: result?.meta,
    })
  },
)

export const SellGroupController = {
  GetAllSellGroupController,
  SingleSellGroupController,
  GetSellGroupByCurrentDateController,
  GetSellGroupByCurrentWeekController,
  GetSellGroupByCurrentMonthController,
  GetSellGroupByCurrentYearController,
  SingleSellGroupGetByOwnIdController,
  FilterByStartAndEndDateController,
}
