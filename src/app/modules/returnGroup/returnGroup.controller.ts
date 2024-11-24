import { ReturnGroups } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { ReturnGroupService } from './returnGroup.services'

// get all ReturnGroup
const GetAllReturnGroupController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'uniqueId',
      'userId',
      'supplierId',
    ])
    const paginationOptions = pick(req.query, paginationQueryKeys)
    const result = await ReturnGroupService.GetAllReturnGroupService(
      filters,
      paginationOptions,
    )

    sendResponse<ReturnGroups[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Return group get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)
// get Single ReturnGroup
const SingleReturnGroupController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ReturnGroupService.SingleReturnGroupService(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Return group get successfully!',
      data: result,
    })
  },
)
// get  ReturnGroup by current date
const SingleReturnGroupByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ReturnGroupService.GetReturnGroupByCurrentDateService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Return group get by current date!',
      data: result,
    })
  },
)
// get  ReturnGroup by current week
const SingleReturnGroupByCurrentWeekController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ReturnGroupService.GetReturnGroupByCurrentWeekService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Return group get by current week!',
      data: result,
    })
  },
)
// get  ReturnGroup by current month
const SingleReturnGroupByCurrentMonthController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ReturnGroupService.GetReturnGroupByCurrentMonthService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Return group get by current month!',
      data: result,
    })
  },
)
// get  ReturnGroup by current year
const SingleReturnGroupByCurrentYearController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ReturnGroupService.GetReturnGroupByCurrentYearService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Return group get by current year!',
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

    const result =
      await ReturnGroupService.ReturnGroupFilterByStartEndDateService(
        startDate as string,
        endDate as string,
      )

    // Send response
    sendResponse<ReturnGroups[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Return filtering success!',
      data: result.data,
      // @ts-ignore
      meta: result?.meta,
    })
  },
)

export const ReturnGroupController = {
  GetAllReturnGroupController,
  SingleReturnGroupController,
  SingleReturnGroupByCurrentDateController,
  SingleReturnGroupByCurrentWeekController,
  SingleReturnGroupByCurrentMonthController,
  SingleReturnGroupByCurrentYearController,
  FilterByStartAndEndDateController,
}
