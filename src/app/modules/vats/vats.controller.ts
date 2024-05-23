import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { VatService } from './vats.services'

// Create a Vat
const CreateVatController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await VatService.CreateVatService(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vat added success!',
    data: result,
  })
})

// get all Vat
const GetAllVatController = CatchAsync(async (req: Request, res: Response) => {
  const result = await VatService.GetAllVatService()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vat get successfully!',
    data: result,
  })
})
// updated Vat
const UpdateVatController = CatchAsync(async (req: Request, res: Response) => {
  const payloads = req.body
  const { id } = req.params

  const result = await VatService.UpdateVatService(id, payloads)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vat updated successfully!',
    data: result,
  })
})

export const VatController = {
  CreateVatController,
  GetAllVatController,
  UpdateVatController,
}
