import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { PayInSupplierService } from './payInSupplier.services'

// Delete product
const CreatePayInSupplierController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body

    const result =
      await PayInSupplierService.CreatePayInSupplierService(payloads)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pay in supplier success.',
      data: result,
    })
  },
)

export const PayInSupplierController = {
  CreatePayInSupplierController,
}
