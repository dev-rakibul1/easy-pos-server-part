import { SupplierSellVariants } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SupplierSellVariantsServices } from './supplierSellVariant.services'

// get all Unit
const GetManyBySupplierSellVariantsIdController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result =
      await SupplierSellVariantsServices.GetManyBySupplierSellVariantsIdServices(
        id,
      )

    sendResponse<SupplierSellVariants[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier sell variants get successfully!',
      data: result,
    })
  },
)

export const SupplierSellVariantsController = {
  GetManyBySupplierSellVariantsIdController,
}
