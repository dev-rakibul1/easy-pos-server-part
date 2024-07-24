import { AdditionalExpenses } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { AdditionalExpensesService } from './AdditionalExpenses.services'

// Create Additional Expenses
const CreateAdditionalExpensesController = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body
    const result =
      await AdditionalExpensesService.CreateAdditionalExpensesService(payload)

    sendResponse<AdditionalExpenses | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional expenses create success!',
      data: result,
    })
  },
)
// get by current date Additional Expenses
const CreateAdditionalExpensesGetByCurrentDateController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentDateService()

    sendResponse<AdditionalExpenses[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional expenses get success! by current date',
      data: result,
    })
  },
)
// get by current week Additional Expenses
const CreateAdditionalExpensesGetByCurrentWeekController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentWeekService()

    sendResponse<AdditionalExpenses[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional expenses get success! by current week',
      data: result,
    })
  },
)
// get by current month Additional Expenses
const CreateAdditionalExpensesGetByCurrentMonthController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentMonthService()

    sendResponse<AdditionalExpenses[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional expenses get success! by current month',
      data: result,
    })
  },
)
// get by current year Additional Expenses
const CreateAdditionalExpensesGetByCurrentYearController = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentYearService()

    sendResponse<AdditionalExpenses[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional expenses get success! by current year',
      data: result,
    })
  },
)
// get all Additional Expenses
const GetAllAdditionalExpensesController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['details', 'uniqueId', 'searchTerm'])
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result =
      await AdditionalExpensesService.GetAllAdditionalExpensesService(
        filters,
        paginationOptions,
      )

    sendResponse<AdditionalExpenses[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional expenses get success!',
      meta: result.meta,
      data: result.data,
    })
  },
)
// update Additional Expenses
const UpdateAdditionalExpensesController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const payloads = req.body

    const result =
      await AdditionalExpensesService.UpdateAdditionalExpensesService(
        id,
        payloads,
      )

    sendResponse<AdditionalExpenses | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Additional expenses update success!',
      data: result,
    })
  },
)
// Single Additional Expenses
const SingleAdditionalExpensesGetController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result =
      await AdditionalExpensesService.SingleAdditionalExpensesGetService(id)

    sendResponse<AdditionalExpenses | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single additional expenses get success!',
      data: result,
    })
  },
)
// Delete Single Additional Expenses
const DeleteAdditionalExpensesController = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result =
      await AdditionalExpensesService.DeleteAdditionalExpensesService(id)

    sendResponse<AdditionalExpenses | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single additional expenses delete success!',
      data: result,
    })
  },
)

export const AdditionalExpensesController = {
  CreateAdditionalExpensesController,
  CreateAdditionalExpensesGetByCurrentDateController,
  CreateAdditionalExpensesGetByCurrentWeekController,
  CreateAdditionalExpensesGetByCurrentMonthController,
  CreateAdditionalExpensesGetByCurrentYearController,
  GetAllAdditionalExpensesController,
  UpdateAdditionalExpensesController,
  SingleAdditionalExpensesGetController,
  DeleteAdditionalExpensesController,
}
