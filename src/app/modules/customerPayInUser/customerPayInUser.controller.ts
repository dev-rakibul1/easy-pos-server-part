import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CustomerPayInUserService } from './customerPayInUser.services'

// create pay
const CreateCustomerPayInUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body

    const result =
      await CustomerPayInUserService.CreateCustomerPayInUserService(payloads)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer pay in user success.',
      data: result,
    })
  },
)

export const CustomerPayInUserController = {
  CreateCustomerPayInUserController,
}
