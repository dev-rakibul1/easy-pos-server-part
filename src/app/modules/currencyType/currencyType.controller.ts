import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CurrencyTypeService } from './currencyType.services'

// Create a currency type
const CreateCurrencyTypeController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result = await CurrencyTypeService.CreateCurrencyTypeService(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Currency added success!',
      data: result,
    })
  },
)

// get all Currency Type
const GetAllCurrencyTypeController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await CurrencyTypeService.GetAllCurrencyTypeService()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Currency get successfully!',
      data: result,
    })
  },
)

export const CurrencyTypeController = {
  CreateCurrencyTypeController,
  GetAllCurrencyTypeController,
}
