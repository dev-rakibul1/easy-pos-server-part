import { Customers } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationQueryKeys } from '../../interfaces/pagination'
import { customerFilterAbleQuery } from './customers.constant'
import { CustomerService } from './customers.services'

// Create a customer
const CreateCustomerController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await CustomerService.CreateCustomerService(req)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer create successfully!',
      data: result,
    })
  },
)

// get all customer
const GetAllCustomerController = CatchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, customerFilterAbleQuery)
    const paginationOptions = pick(req.query, paginationQueryKeys)

    const result = await CustomerService.GetAllCustomerService(
      filters,
      paginationOptions,
    )

    sendResponse<Customers[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer get successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)
// update customer
const UpdateCustomerController = CatchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body
    const { id } = req.params

    const result = await CustomerService.UpdateCustomerService(id, payloads)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer updated success!',
      data: result,
    })
  },
)

export const CustomerController = {
  CreateCustomerController,
  GetAllCustomerController,
  UpdateCustomerController,
}
