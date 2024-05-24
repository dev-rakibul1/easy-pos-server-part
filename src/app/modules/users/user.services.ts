import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Request } from 'express'
import httpStatus from 'http-status'
import { ENUM_USER_ROLE, PAYLOADS } from '../../../enums/role'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IUserFilterRequest } from './user.type'
import { userFilterableKey } from './users.constant'

// Create user
const CreateUserService = async (req: Request) => {
  const payloads: User = req.body
  const userId = await generateUniqueId('u')
  payloads.uniqueId = userId

  // image setup
  const filePath = `/${req.file?.destination}${req.file?.originalname}`
  if (filePath) {
    payloads.profileImage = filePath
  }

  // Password Bcrypt
  if (!payloads.password) {
    const saltPass = await bcrypt.hash(
      PAYLOADS.DEFAULT_USER_PASSWORD,
      PAYLOADS.PASSWORD_SALT_ROUND,
    )
    payloads.password = saltPass
  } else {
    const saltPass = await bcrypt.hash(
      payloads.password,
      PAYLOADS.PASSWORD_SALT_ROUND,
    )
    payloads.password = saltPass
  }

  // Transaction
  return prisma.$transaction(async tx => {
    const existingEmail = await tx.user.findUnique({
      where: { email: payloads.email },
    })

    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }

    // Check if phone number already exists
    const existingPhoneNo = await tx.user.findUnique({
      where: { phoneNo: payloads.phoneNo },
    })

    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }

    if (payloads.role && payloads.role === ENUM_USER_ROLE.SUPER_ADMIN) {
      const supperAdmin = await tx.user.findFirst({
        where: { role: payloads.role },
      })

      if (supperAdmin) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'A super admin already exists in this application. Only one super admin is allowed.',
        )
      }
    }

    const result = await tx.user.create({ data: payloads })
    return result
  })
}

// get all user
const GetAllCreateUserService = async (
  filters: IUserFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<User[]>> => {
  // filters
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // SearchTerms
  if (searchTerm) {
    andConditions.push({
      OR: userFilterableKey.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // Filter data
  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  // Where conditions
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  // Pagination
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,

    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            createdAt: 'desc',
          },

    include: {
      purchases: true,
      sells: true,
      customerPayment: true,
      supplierPayment: true,
    },
  })

  const total = await prisma.user.count()
  return {
    meta: { limit, page, total },
    data: result,
  }
}

// updated user
const UpdateUserService = async (
  id: string,
  payloads: Partial<User>,
): Promise<Partial<User>> => {
  const isExist = await prisma.user.findUnique({ where: { id: id } })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid user.')
  }

  return prisma.$transaction(async tx => {
    const existingEmail = await tx.user.findUnique({
      where: { email: payloads.email },
    })

    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }

    // Check if phone number already exists
    const existingPhoneNo = await tx.user.findUnique({
      where: { phoneNo: payloads.phoneNo },
    })

    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }

    if (payloads.role && payloads.role === ENUM_USER_ROLE.SUPER_ADMIN) {
      const superAdmin = await tx.user.findFirst({
        where: { role: payloads.role },
      })

      if (superAdmin) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'A super admin already exists in this application. Only one super admin is allowed.',
        )
      }
    }

    const result = await tx.user.update({ where: { id: id }, data: payloads })
    return result
  })
}
// updated user
const DeleteUserService = async (id: string): Promise<Partial<User | null>> => {
  const isExist = await prisma.user.findUnique({ where: { id } })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid user.')
  }

  if (isExist.role === ENUM_USER_ROLE.SUPER_ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Deletion of the super admin is not permitted.',
    )
  }

  const deleteUser = await prisma.user.delete({ where: { id } })

  return deleteUser
}

export const UserService = {
  CreateUserService,
  GetAllCreateUserService,
  UpdateUserService,
  DeleteUserService,
}
