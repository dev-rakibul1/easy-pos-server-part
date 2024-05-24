import { Suppliers } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { supplierFilterAbleQuery } from './supplier.constant'
import { SupplierService } from './supplier.services'

// Create a supplier
const CreateSupplierController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await SupplierService.CreateSupplierService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier create successfully!',
      data: result,
    })
  },
)

// get all supplier
const GetAllSupplierController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, supplierFilterAbleQuery)
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await SupplierService.GetAllSupplierUserService(
      filters,
      paginationOptions,
    )

    sendResponse<Suppliers[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)
// updated  supplier
const UpdateSupplierController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body
    const { id } = req.params
    const result = await SupplierService.UpdateSupplierUserService(id, payloads)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier updated successfully!',
      data: result,
    })
  },
)

export const SupplierController = {
  CreateSupplierController,
  GetAllSupplierController,
  UpdateSupplierController,
}
