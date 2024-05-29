import { Categorys } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
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
    const filters = pick(req.query, ['categoryName', 'searchTerm'])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await CategoryService.GetAllCategoryService(
      filters,
      paginationOptions,
    )

    sendResponse<Categorys[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)
// get single Category
const GetSingleCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.GetSingleCategoryService(id)

    sendResponse<Categorys | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single category get successfully!',
      data: result,
    })
  },
)
// updated Category
const UpdateCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const payloads = req.body
    const result = await CategoryService.UpdateCategoryService(id, payloads)

    sendResponse<Partial<Categorys | null>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully!',
      data: result,
    })
  },
)
// delete Category
const DeleteCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.DeleteCategoryService(id)

    sendResponse<Categorys | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully!',
      data: result,
    })
  },
)

export const CategoryController = {
  CreateCategoryController,
  GetAllCategoryController,
  GetSingleCategoryController,
  UpdateCategoryController,
  DeleteCategoryController,
}
