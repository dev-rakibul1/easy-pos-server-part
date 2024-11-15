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
// get all PurchaseGroup
const GetAllPurchaseGroupByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await PurchaseGroupService.GetAllPurchaseGroupByCurrentDateService()

    sendResponse<PurchaseGroup[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase group get by current date!',
      data: result,
    })
  },
)
// get all Purchase Group week
const GetAllPurchaseGroupByCurrentWeekController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await PurchaseGroupService.GetAllPurchaseGroupByCurrentWeekService()

    sendResponse<PurchaseGroup[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase group get by current week!',
      data: result,
    })
  },
)
// get all Purchase Group month
const GetAllPurchaseGroupByCurrentMonthController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await PurchaseGroupService.GetAllPurchaseGroupByCurrentMonthService()

    sendResponse<PurchaseGroup[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase group get by current month!',
      data: result,
    })
  },
)
// get all Purchase Group month
const GetAllPurchaseGroupByCurrentYearController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await PurchaseGroupService.GetAllPurchaseGroupByCurrentYearService()

    sendResponse<PurchaseGroup[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase group get by current year!',
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
  GetAllPurchaseGroupByCurrentDateController,
  GetAllPurchaseGroupByCurrentWeekController,
  GetAllPurchaseGroupByCurrentMonthController,
  GetAllPurchaseGroupByCurrentYearController,
}
