import { ReturnGroups } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
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

export const ReturnGroupController = {
  GetAllReturnGroupController,
  SingleReturnGroupController,
}
