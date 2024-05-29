import { Brands } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
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
    const result = await BrandService.GetAllBrandService()

    sendResponse<Brands[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Brand get successfully!',
      data: result,
    })
  },
)

export const BrandController = {
  CreateBrandController,
  GetAllBrandController,
}
