import { Warranty } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { WarrantyService } from './warranty.services'

// Create a warranty controller
const CreateVatController = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await WarrantyService.CreateWarrantyService(payload)

  sendResponse<Warranty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Warranty place success!',
    data: result,
  })
})

export const WarrantyController = {
  CreateVatController,
}
