import { Shop } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ShopService } from './shop.services'

// Create a shop
const CreateShopController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await ShopService.CreateShopService(payload)

  sendResponse<Shop>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop data record success!',
    data: result,
  })
})

// update a shop
const UpdateShopController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const { id } = req.params
  const result = await ShopService.UpdateShopService(id, payload)

  sendResponse<Partial<Shop>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop details update success!',
    data: result,
  })
})

// Delete a shop record
const DeleteShopController = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ShopService.DeleteShopService(id)

  sendResponse<Partial<Shop>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop record delete success!',
    data: result,
  })
})

// Get single shop record
const SingleShopController = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ShopService.GetSingleShopService(id)

  sendResponse<Shop>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single record get',
    data: result,
  })
})
// Get first shop record
const GetFirstShopController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ShopService.GetFirstShopService()

    sendResponse<Shop>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get first success!',
      data: result,
    })
  },
)
// Get a shop record
const GetShopController = CatchAsync(async (req: Request, res: Response) => {
  const result = await ShopService.GetShopService()

  sendResponse<Shop[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop record get success!',
    data: result,
  })
})

export const ShopController = {
  CreateShopController,
  UpdateShopController,
  DeleteShopController,
  GetShopController,
  SingleShopController,
  GetFirstShopController,
}
