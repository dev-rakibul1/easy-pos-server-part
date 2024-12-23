import { Product } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { productFilterableQuery } from './product.constant'
import { ProductsService } from './product.services'

// Create a product
const CreateProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductsService.CreateProductsService(req)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products create successfully!',
      data: result,
    })
  },
)

// get all product
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
// Delete product
const DeleteProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await ProductsService.DeleteProductGetService(id)

    sendResponse<Partial<Product> | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product deleted success.',
      data: result,
    })
  },
)
// Stock in product
const StockInProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductsService.StockInProductGetService()

    sendResponse<Product[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Stock in product get success.',
      data: result,
    })
  },
)

// Stock in product get by status
const StockInProductByStatusController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, productFilterableQuery)
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await ProductsService.StockInProductByStatusGetService(
      filters,
      paginationOptions,
    )

    sendResponse<Product[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Stock in get success!',
      data: result.data,
      meta: result.meta,
    })
  },
)
// Stock out product get by status
const StockOutProductByStatusController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, productFilterableQuery)
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await ProductsService.StockOutProductByStatusGetService(
      filters,
      paginationOptions,
    )

    sendResponse<Product[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Stock out get success!',
      data: result.data,
      meta: result.meta,
    })
  },
)

export const ProductsController = {
  CreateProductsController,
  GetAllProductsController,
  GetSingleProductsController,
  UpdateProductsController,
  DeleteProductsController,
  StockInProductByStatusController,
  StockInProductsController,
  StockOutProductByStatusController,
}
