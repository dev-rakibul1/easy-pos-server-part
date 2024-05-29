import { Brands } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { BrandService } from './brand.services'

// Create a color
const CreateBrandController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await BrandService.CreateBrandService(payload)

    sendResponse<Brands | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Brand added success!',
      data: result,
    })
  },
)

// get all brand
const GetAllBrandController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['description', 'brandName', 'searchTerm'])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await BrandService.GetAllBrandService(
      filters,
      paginationOptions,
    )

    sendResponse<Brands[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Brand get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)
// get single brand
const GetSingleBrandController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BrandService.GetSingleBrandService(id)

    sendResponse<Brands | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single brand get successfully!',
      data: result,
    })
  },
)
// updated brand
const UpdateBrandController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const payloads = req.body
    const result = await BrandService.UpdateBrandService(id, payloads)

    sendResponse<Partial<Brands>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Updated brand successfully!',
      data: result,
    })
  },
)
// deleted brand
const DeleteBrandController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BrandService.DeleteBrandService(id)

    sendResponse<Brands>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Brand deleted successfully!',
      data: result,
    })
  },
)

export const BrandController = {
  CreateBrandController,
  GetAllBrandController,
  DeleteBrandController,
  UpdateBrandController,
  GetSingleBrandController,
}
