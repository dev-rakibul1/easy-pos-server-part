import { Vats } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
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
  const filters = pick(req.query, ['searchTerm', 'name', 'vatType'])
  const paginationOptions = pick(req.query, paginationQueryKeys)

  const result = await VatService.GetAllVatService(filters, paginationOptions)

  sendResponse<Vats[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vat get successfully!',
    meta: result.meta,
    data: result.data,
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

// Delete Vat
const DeleteVatController = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await VatService.DeleteVatService(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vat deleted successfully!',
    data: result,
  })
})
// get single Vat
const GetSingleVatController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await VatService.GetSingleVatService(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single vat get successfully!',
      data: result,
    })
  },
)

export const VatController = {
  CreateVatController,
  GetAllVatController,
  UpdateVatController,
  GetSingleVatController,
  DeleteVatController,
}
