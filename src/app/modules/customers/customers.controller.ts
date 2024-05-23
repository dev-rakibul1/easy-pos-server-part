import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CustomerService } from './customers.services'

// Create a customer
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

// get all customer
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
// update customer
const UpdateCustomerController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body
    const { id } = req.params

    const result = await CustomerService.UpdateCustomerService(id, payloads)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer updated success!',
      data: result,
    })
  },
)

export const CustomerController = {
  CreateCustomerController,
  GetAllCustomerController,
  UpdateCustomerController,
}
