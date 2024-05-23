import { Product } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductsService } from './product.services'

// Create a user
const CreateProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await ProductsService.CreateUserService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products create successfully!',
      data: result,
    })
  },
)

// get all user
const GetAllProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductsService.GetAllCreateUserService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product get successfully!',
      data: result,
    })
  },
)

// get single product
const GetSingleProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductsService.SingleProductGetService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single product get successfully!',
      data: result,
    })
  },
)
// get single product
const UpdateProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body
    const { id } = req.params

    const result = await ProductsService.UpdateProductGetService(id, payloads)

    sendResponse<Partial<Product> | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product updated success.',
      data: result,
    })
  },
)

export const ProductsController = {
  CreateProductsController,
  GetAllProductsController,
  GetSingleProductsController,
  UpdateProductsController,
}
