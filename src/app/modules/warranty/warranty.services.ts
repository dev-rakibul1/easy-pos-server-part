import { Prisma, Warranty } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { FormatDate } from '../../../utilities/dateFormat/dateFormat'
import { Mail } from '../../../utilities/mailTamplete/mail'
import { generateUniqueWarrantyId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { filterableSearch } from './warranty.constant'
import { IWarrantyFilterRequest } from './warranty.type'

// Create warranty service
const CreateWarrantyService = async (payloads: Warranty) => {
  // Check if the product with the same IMEI already exists with an active warranty
  const isExistProduct = await prisma.warranty.findMany({
    where: { imei: payloads.imei },
  })
  //   console.log(isExistProduct)
  const statuses = isExistProduct?.map((item: Warranty) => item.status)

  const isTrue = statuses.every((anItem: Boolean) => {
    return anItem === false
  })

  // console.log(isTrue)

  if (!isTrue) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Warranty already submitted!')
  }

  // Generate a unique warranty ID
  const WarrantyId = await generateUniqueWarrantyId('War')

  // Create the new warranty entry in the database
  const createWarranty = await prisma.warranty.create({
    data: {
      ...payloads,
      uniqueId: WarrantyId,
      repairCount: statuses.length,
      status: payloads.status ?? true,
      deliveryTime: payloads?.status === true ? null : new Date().toISOString(),
    },
  })

  // Mail send
  const subject = `Warranty Submitted Successfully - ${payloads.purchasePlace}`
  const recipient = payloads.email
  const warrantyBody = `
<div style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #4CAF50;">🎉 Warranty Submission Confirmed!</h2>
  <p>Hi <strong>${payloads?.name}</strong>,</p>

  <p>We're excited to let you know that your warranty for the <strong>${payloads?.model}</strong> has been successfully submitted!</p>

  <p>Here are the details of your warranty submission:</p>
  <ul style="line-height: 1.8;">
    <li><strong>Product Imei:</strong> ${payloads?.imei}</li>
    <li><strong>Purchase Date:</strong> ${FormatDate(payloads?.purchaseDate)}</li>
    <li><strong>Warranty ID:</strong> ${createWarranty?.uniqueId}</li>
  </ul>

  <p>We’ve got your back! Our team is reviewing your submission, and you will hear from us shortly. If you have any questions or need assistance, feel free to reply to this email.</p>

  <p>Thank you for choosing <strong>${payloads?.purchasePlace}</strong>. We're always here to help!</p>

  <p style="margin-top: 20px;">Best regards,<br /><strong>Customer Care Team</strong><br />${payloads.purchasePlace}</p>
</div>
`
  Mail(recipient, subject, warrantyBody)

  return createWarranty
}

// FIlter by pending
const GetPendingWarrantyService = async (
  filters: IWarrantyFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Warranty[] | null>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  andConditions.push({
    status: true,
  })

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: filterableSearch.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // Filters
  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  // Pagination
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Where condition
  const whereConditions: Prisma.WarrantyWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.warranty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.warranty.count({ where: { status: true } })

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// Delivery service
const GetDeliveryWarrantyService = async (
  filters: IWarrantyFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Warranty[] | null>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  andConditions.push({
    status: false,
  })

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: filterableSearch.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // Filters
  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }
  // Pagination
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Where condition
  const whereConditions: Prisma.WarrantyWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.warranty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.warranty.count({ where: { status: false } })

  return {
    meta: { limit, page, total },
    data: result,
  }
}
// Get single pending warranty service
const GetSinglePendingWarrantyService = async (
  id: string,
): Promise<Warranty | null> => {
  const result = await prisma.warranty.findFirst({
    where: { id: id },
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not exiting.')
  }

  return result
}
// Delivered pending warranty service
const DeliveredPendingWarrantyServices = async (
  id: string,
  payloads: Warranty,
): Promise<Partial<Warranty>> => {
  const result = await prisma.warranty.findFirst({
    where: { id },
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found.')
  }

  let updatedResult = result

  console.log(225, payloads)

  // Check the status and perform update if necessary
  if (payloads.status === false) {
    updatedResult = await prisma.warranty.update({
      where: { id },
      data: { status: false }, // Correct key-value structure
    })
  }

  // Mail send
  const subject = `🎉 Congratulations! Your Product is Ready for Pickup!`
  const recipient = payloads.email
  const warrantyBody = `
<div style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #4CAF50;">🎉 Congratulations!</h2>
  <p>Hi <strong>${result?.name}</strong>,</p>

  <p>We are thrilled to inform you that your product <strong>${result?.model}</strong> has been successfully repaired by our Customer Care team!</p>

  <p>Your item is now ready for pickup at your convenience. Here are the details:</p>
  <ul style="line-height: 1.8;">
    <li><strong>Product IMEI:</strong> ${result?.imei}</li>
    <li><strong>Warranty ID:</strong> ${result?.uniqueId}</li>
    <li><strong>Pickup Location:</strong> ${result?.purchasePlace}</li>
    <li><strong>Pickup Date:</strong> ${new Date().toLocaleDateString()}</li>
  </ul>

  <p>Thank you for choosing <strong>${result?.purchasePlace}</strong>. We appreciate your trust in us, and we're here to help!</p>

  <p style="margin-top: 20px;">Best regards,<br /><strong>Customer Care Team</strong><br />${payloads.purchasePlace}</p>
</div>
`

  Mail(recipient, subject, warrantyBody)

  return updatedResult
}

export const WarrantyService = {
  CreateWarrantyService,
  GetPendingWarrantyService,
  GetDeliveryWarrantyService,
  GetSinglePendingWarrantyService,
  DeliveredPendingWarrantyServices,
}
