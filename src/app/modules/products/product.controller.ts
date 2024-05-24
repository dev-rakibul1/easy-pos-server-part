import { Product } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { productFilterableQuery } from './product.constant'
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
    const filters = pick(req.query, productFilterableQuery)
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await ProductsService.GetAllCreateUserService(
      filters,
      paginationOptions,
    )

    sendResponse<Product[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)

// get single product
const GetSingleProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await ProductsService.SingleProductGetService(id)

    sendResponse<Product | null>(res, {
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
