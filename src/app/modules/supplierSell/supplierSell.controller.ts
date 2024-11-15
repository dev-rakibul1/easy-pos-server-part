import { SupplierSell } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SupplierSellsService } from './supplierSell.services'

// Create a Supplier Sell
const CreateSupplierSellController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result =
      await SupplierSellsService.CreateSupplierSellsService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier sell success!',
      data: result,
    })
  },
)

// get all SupplierSell
const GetAllSupplierSellController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await SupplierSellsService.GetAllSupplierSellsService()

    sendResponse<SupplierSell[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier sell get successfully!',
      data: result,
    })
  },
)
// get all SupplierSell
const GetSupplierSellBySupplierAndUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const ids = req.params
    const result =
      await SupplierSellsService.GetSupplierSellBySupplierAndUserService(ids)

    sendResponse<SupplierSell[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier sell get by supplier and user success!',
      data: result,
    })
  },
)
// get supplier sell by user id
const GetSupplierSellByUserIdController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SupplierSellsService.GetSupplierSellByUserIdService(id)

    sendResponse<SupplierSell[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier sell get by user id!',
      data: result,
    })
  },
)
// get all SupplierSell
const GetSingleSupplierSellController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SupplierSellsService.GetSingleSupplierSellService(id)

    sendResponse<SupplierSell | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single sells get success!',
      data: result,
    })
  },
)

export const SupplierSellController = {
  GetAllSupplierSellController,
  CreateSupplierSellController,
  GetSupplierSellBySupplierAndUserController,
  GetSingleSupplierSellController,
  GetSupplierSellByUserIdController,
}
