import { CustomerPurchase } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CustomerPurchaseService } from './customerPurchase.services'

// get all customer purchase
const GetCustomerPurchaseByCustomerAndUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const ids = req.params
    const result =
      await CustomerPurchaseService.GetCustomerPurchaseByCustomerAndUserService(
        ids,
      )

    sendResponse<CustomerPurchase[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer purchase get by customer and user success!',
      data: result,
    })
  },
)
// get all customer purchase
const GetSingleCustomerPurchaseController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await CustomerPurchaseService.GetSingleCustomerPurchaseService(id)

    sendResponse<CustomerPurchase | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single customer purchase get success!',
      data: result,
    })
  },
)
// get all customer purchase
const GetCustomerPurchaseByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await CustomerPurchaseService.GetSingleCustomerPurchaseByCurrentDateService()

    sendResponse<CustomerPurchase[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single customer purchase get by current date!',
      data: result,
    })
  },
)

export const CustomerPurchaseController = {
  GetCustomerPurchaseByCustomerAndUserController,
  GetSingleCustomerPurchaseController,
  GetCustomerPurchaseByCurrentDateController,
}
