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
    const result = await SupplierService.CreateSupplierService(req)

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
// get single  supplier
const GetSingleSupplierController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SupplierService.GetSingleSupplierService(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Supplier get successfully!',
      data: result,
    })
  },
)

// get supplier by supplier, product and user
const GetBySuppliersByUserSupplierProductController = CatchAsync(
  async (req: Request, res: Response) => {
    const ids = req.params
    const result =
      await SupplierService.GetSuppliersByUserSupplierProductService(ids)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get supplier by supplier, user and product successfully',
      data: result,
    })
  },
)
// get by user id
const GetByUserIdController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SupplierService.GetByUserIdService(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get by user id.',
      data: result,
    })
  },
)

export const SupplierController = {
  CreateSupplierController,
  GetAllSupplierController,
  UpdateSupplierController,
  GetSingleSupplierController,
  GetBySuppliersByUserSupplierProductController,
  GetByUserIdController,
}
