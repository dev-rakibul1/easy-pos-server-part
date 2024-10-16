import { Warranty } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { WarrantyFilterKeys } from './warranty.constant'
import { WarrantyService } from './warranty.services'

// Create a warranty controller
const CreateWarrantyController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await WarrantyService.CreateWarrantyService(payload)

    sendResponse<Warranty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Warranty place success!',
      data: result,
    })
  },
)

// Pending a warranty controller
const WarrantyGetPendingController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, WarrantyFilterKeys)
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await WarrantyService.GetPendingWarrantyService(
      filters,
      paginationOptions,
    )

    sendResponse<Warranty[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pending warranty get success!',
      data: result.data,
      meta: result.meta,
    })
  },
)
// Delivery a warranty controller
const WarrantyGetDeliveryController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, WarrantyFilterKeys)
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await WarrantyService.GetDeliveryWarrantyService(
      filters,
      paginationOptions,
    )

    sendResponse<Warranty[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delivery warranty get success!',
      data: result.data,
      meta: result.meta,
    })
  },
)

// Get single pending warranty controller
const GetSinglePendingWarrantyController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await WarrantyService.GetSinglePendingWarrantyService(id)

    sendResponse<Warranty | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single warranty pending get success!',
      data: result,
    })
  },
)
// Delivered pending warranty controller
const DeliveredPendingWarrantyController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const payloads = req.body

    const result = await WarrantyService.DeliveredPendingWarrantyServices(
      id,
      payloads,
    )

    sendResponse<Partial<Warranty | null>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delivered success!',
      data: result,
    })
  },
)

export const WarrantyController = {
  CreateWarrantyController,
  WarrantyGetPendingController,
  WarrantyGetDeliveryController,
  GetSinglePendingWarrantyController,
  DeliveredPendingWarrantyController,
}
