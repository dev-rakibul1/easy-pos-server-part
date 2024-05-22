import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CustomerPaymentService } from './customerPayments.services'

// Create a customer payment
const CreateCustomerPaymentController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result =
      await CustomerPaymentService.CreateCustomerPaymentService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment success!',
      data: result,
    })
  },
)

// get all customer payment
const GetAllCustomerPaymentController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await CustomerPaymentService.GetAllCustomerPaymentService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer payment get successfully!',
      data: result,
    })
  },
)

export const CustomerPaymentController = {
  CreateCustomerPaymentController,
  GetAllCustomerPaymentController,
}
