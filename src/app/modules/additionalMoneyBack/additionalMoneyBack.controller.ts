import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AdditionalMoneyBackService } from './additionalMoneyBack.services'

// AdditionalMoneyBack
const CreateAdditionalMoneyBackController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body

    const result =
      await AdditionalMoneyBackService.CreateAdditionalMoneyBackService(
        payloads,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional money back create success.',
      data: result,
    })
  },
)

export const AdditionalMoneyBackController = {
  CreateAdditionalMoneyBackController,
}
