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
// get all purchase by current date
const GetAllPurchaseByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await PurchaseService.GetAllPurchaseByCurrentDateService()

    sendResponse<Purchase[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All purchase get by current date!',

      data: result,
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

// Purchase buy supplier and user
const GetBySupplierAndUserPurchaseController = CatchAsync(
  async (req: Request, res: Response) => {
    const ids = req.params
    const result =
      await PurchaseService.GetBuySupplierAndUserPurchaseService(ids)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get purchase by supplier and user successfully',
      data: result,
    })
  },
)
// Single purchase get
const GetSinglePurchaseController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await PurchaseService.GetSinglePurchaseService(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single purchase get successfully',
      data: result,
    })
  },
)

export const PurchaseController = {
  CreatePurchaseController,
  GetAllPurchaseController,
  UpdatePurchaseController,
  GetBySupplierAndUserPurchaseController,
  GetSinglePurchaseController,
  GetAllPurchaseByCurrentDateController,
}
