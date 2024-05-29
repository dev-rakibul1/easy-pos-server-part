import { Categorys } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CategoryService } from './category.services'

// Create a Category
const CreateCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await CategoryService.CreateCategoryService(payload)

    sendResponse<Categorys | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category added success!',
      data: result,
    })
  },
)

// get all Category
const GetAllCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.GetAllCategoryService()

    sendResponse<Categorys[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category get successfully!',
      data: result,
    })
  },
)

export const CategoryController = {
  CreateCategoryController,
  GetAllCategoryController,
}
