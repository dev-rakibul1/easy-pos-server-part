import { User } from '@prisma/client'
import { ENUM_USER_PASSWORD, ENUM_USER_ROLE } from '../../../enums/role'
import prisma from '../../../shared/prisma'
import { generateUniqueId } from '../../../utilities/uniqueIdGenerator'

// Create user
const CreateUserService = async (payload: User) => {
  const userId = await generateUniqueId('u')
  payload.uniqueId = userId

  if (!payload.password) {
    payload.password = ENUM_USER_PASSWORD.DEFAULT_USER_PASSWORD
  }
  if (!payload.role) {
    payload.role = ENUM_USER_ROLE.USER
  }

  const result = await prisma.user.create({ data: payload })
  return result
}

// get all user
const GetAllCreateUserService = async () => {
  const result = await prisma.user.findMany({
    include: {
      purchases: true,
      sells: true,
    },
  })
  return result
}

export const UserService = {
  CreateUserService,
  GetAllCreateUserService,
}
