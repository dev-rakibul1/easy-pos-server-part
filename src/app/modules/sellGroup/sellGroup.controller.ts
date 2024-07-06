import { SellGroups } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
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

export const SellGroupController = {
  GetAllSellGroupController,
  SingleSellGroupController,
  GetSellGroupByCurrentDateController,
}
