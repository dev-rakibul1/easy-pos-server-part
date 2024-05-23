import { User } from '@prisma/client'
import httpStatus from 'http-status'
import { ENUM_USER_PASSWORD, ENUM_USER_ROLE } from '../../../enums/role'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueId } from '../../../utilities/uniqueIdGenerator'

// Create user
const CreateUserService = async (payloads: User) => {
  const userId = await generateUniqueId('u')
  payloads.uniqueId = userId

  if (!payloads.password) {
    payloads.password = ENUM_USER_PASSWORD.DEFAULT_USER_PASSWORD
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
const GetAllCreateUserService = async () => {
  const result = await prisma.user.findMany({
    include: {
      purchases: true,
      sells: true,
      customerPayment: true,
      supplierPayment: true,
    },
  })
  return result
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

export const UserService = {
  CreateUserService,
  GetAllCreateUserService,
  UpdateUserService,
}
