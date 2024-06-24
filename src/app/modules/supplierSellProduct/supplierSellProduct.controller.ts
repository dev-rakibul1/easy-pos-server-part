import { SupplierSellProduct } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SupplierSellProductService } from './supplierSellProduct.services'

// get all Supplier Sell Product
const GetAllSupplierSellProductController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SupplierSellProductService.GetAllSupplierSellProductService()

    sendResponse<SupplierSellProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier Sell Product get successfully!',
      data: result,
    })
  },
)
// Get by user and Supplier Sell Product
const GetByUserAndSupplierController = CatchAsync(
  async (req: Request, res: Response) => {
    const ids = req.params
    const result =
      await SupplierSellProductService.GetByUserAndSupplierService(ids)

    sendResponse<SupplierSellProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier Sell Product get successfully!',
      data: result,
    })
  },
)
// Get by user and Supplier Sell Product
const GetSingleSupplierSellProductController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await SupplierSellProductService.GetSingleSupplierSellProductService(id)

    sendResponse<SupplierSellProduct | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single supplier Sell get successfully!',
      data: result,
    })
  },
)

export const SupplierSellProductController = {
  GetAllSupplierSellProductController,
  GetByUserAndSupplierController,
  GetSingleSupplierSellProductController,
}
