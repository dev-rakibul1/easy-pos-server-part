import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../../shared/catchAsync'
import sendResponse from '../../../../shared/sendResponse'
import { UserWebService } from './webCustomer.services'

// Create a user
const CreateWebUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await UserWebService.CreateWebService(req)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Web customer create successfully!',
      data: result,
    })
  },
)

export const WebCustomerController = {
  CreateWebUserController,
}
