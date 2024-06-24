import { PurchaseGroup } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { PurchaseGroupService } from './purchaseGroup.services'

// get all PurchaseGroup
const GetAllPurchaseGroupController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await PurchaseGroupService.GetAllPurchaseGroupService()

    sendResponse<PurchaseGroup[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase group get successfully!',
      data: result,
    })
  },
)
// get Single PurchaseGroup
const SinglePurchaseGroupController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await PurchaseGroupService.SinglePurchaseGroupService(id)

    sendResponse<PurchaseGroup | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single purchase group get successfully!',
      data: result,
    })
  },
)

export const PurchaseGroupController = {
  GetAllPurchaseGroupController,
  SinglePurchaseGroupController,
}
