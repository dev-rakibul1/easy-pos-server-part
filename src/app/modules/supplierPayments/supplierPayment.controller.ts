import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SupplierPaymentService } from './supplierPayment.services'

// Create a user
const CreateSupplierPaymentController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result =
      await SupplierPaymentService.CreateSupplierPaymentService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier payment successfully done',
      data: result,
    })
  },
)

// get all user
const GetAllSupplierPaymentController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SupplierPaymentService.GetAllSupplierPaymentService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier payment get successfully',
      data: result,
    })
  },
)

// get by supplier and user
const GetSupplierAndUserTransSupplierPaymentController = CatchAsync(
  async (req: Request, res: Response) => {
    const ids = req.params
    const result =
      await SupplierPaymentService.SupplierAndUserTransSupplierPaymentService(
        ids,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier and user payment get successfully',
      data: result,
    })
  },
)

export const SupplierPaymentController = {
  CreateSupplierPaymentController,
  GetAllSupplierPaymentController,
  GetSupplierAndUserTransSupplierPaymentController,
}
