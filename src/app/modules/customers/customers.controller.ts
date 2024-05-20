import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CustomerService } from './customers.services'

// Create a user
const CreateCustomerController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await CustomerService.CreateCustomerService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer create successfully!',
      data: result,
    })
  },
)

// get all user
const GetAllCustomerController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await CustomerService.GetAllCustomerService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer get successfully!',
      data: result,
    })
  },
)

export const CustomerController = {
  CreateCustomerController,
  GetAllCustomerController,
}
