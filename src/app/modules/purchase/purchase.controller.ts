import { Purchase } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
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
    const filters = pick(req.query, ['color', 'uniqueId', 'searchTerm'])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await PurchaseService.GetAllCreatePurchaseService(
      filters,
      paginationOptions,
    )

    sendResponse<Purchase[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All purchase get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)

// purchase updated
const UpdatePurchaseController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const { id } = req.params

    const result = await PurchaseService.UpdateCreatePurchaseService(
      id,
      payload,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase updated success',
      data: result,
    })
  },
)

export const PurchaseController = {
  CreatePurchaseController,
  GetAllPurchaseController,
  UpdatePurchaseController,
}
