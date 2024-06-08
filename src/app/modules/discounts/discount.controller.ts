import { Discounts } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { DiscountService } from './discount.services'

// Create a Discount
const CreateDiscountController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await DiscountService.CreateDiscountService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discount added success!',
      data: result,
    })
  },
)

// get all Discount
const GetAllDiscountController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'name', 'discountType'])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await DiscountService.GetAllDiscountService(
      filters,
      paginationOptions,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discount get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)

// updated Discount
const UpdateDiscountController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body
    const { id } = req.params

    const result = await DiscountService.UpdateDiscountService(id, payloads)

    sendResponse<Partial<Discounts>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discount updated successfully!',
      data: result,
    })
  },
)
// get single Discount
const GetSingleDiscountController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await DiscountService.GetSingleDiscountService(id)

    sendResponse<Partial<Discounts>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single discount get successfully!',
      data: result,
    })
  },
)
// Delete Discount
const DeleteDiscountController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await DiscountService.DeleteDiscountService(id)

    sendResponse<Partial<Discounts>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discount deleted successfully!',
      data: result,
    })
  },
)

export const DiscountController = {
  CreateDiscountController,
  GetAllDiscountController,
  UpdateDiscountController,
  DeleteDiscountController,
  GetSingleDiscountController,
}
