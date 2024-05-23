import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
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
    const result = await SupplierService.GetAllSupplierUserService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier get successfully!',
      data: result,
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
