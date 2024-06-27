import { Variants } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { VariantService } from './variants.services'

// Create a variant
const CreateVariantsController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await VariantService.CreateVariantService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Variant create successfully!',
      data: result,
    })
  },
)

// get all variant
const GetAllVariantsController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'imeiNumber',
      'ram',
      'rom',
      'color',
    ])

    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await VariantService.GetAllCreateVariantService(
      filters,
      paginationOptions,
    )

    sendResponse<Variants[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Variant get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)

// get all variant
const DeleteSingleVariantsController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await VariantService.DeleteSingleVariantService(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Variant delete successfully!',
      data: result,
    })
  },
)
// get all variant
const GetSingleVariantsController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await VariantService.GetSingleSingleVariantService(id)

    sendResponse<Variants | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single variant get successfully!',
      data: result,
    })
  },
)

export const VariantsController = {
  CreateVariantsController,
  GetAllVariantsController,
  DeleteSingleVariantsController,
  GetSingleVariantsController,
}
