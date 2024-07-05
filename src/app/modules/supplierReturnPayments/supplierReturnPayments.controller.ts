import { SupplierReturnPayments } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SupplierReturnPaymentService } from './supplierReturnPayments.services'

// get all supplier return payment
const GetReturnByUserAndSupplierController = CatchAsync(
  async (req: Request, res: Response) => {
    const ids = req.params
    const result =
      await SupplierReturnPaymentService.GetSupplierReturnPaymentByUserAndSupplierService(
        ids,
      )

    sendResponse<SupplierReturnPayments[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier return payment get by supplier and user success!',
      data: result,
    })
  },
)
// get all supplier return payment
const GetSingleSupplierReturnPaymentController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await SupplierReturnPaymentService.GetSingleSupplierReturnPaymentService(
        id,
      )

    sendResponse<SupplierReturnPayments | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single supplier return payment get success!',
      data: result,
    })
  },
)

export const SupplierReturnPaymentController = {
  GetReturnByUserAndSupplierController,
  GetSingleSupplierReturnPaymentController,
}
