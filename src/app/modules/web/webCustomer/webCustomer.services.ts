import { Customers } from '@prisma/client'
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { placeholderUser } from '../../../../assets/placeholderImage'
import { PAYLOADS } from '../../../../enums/role'
import ApiError from '../../../../errors/apiError'
import { FileUploads } from '../../../../helpers/fileUploader'
import { jwtTokenProvider } from '../../../../helpers/jwtHelper'
import prisma from '../../../../shared/prisma'
import { generateUniqueCustomerId } from '../../../../utilities/uniqueIdGenerator'
import { IUploadFile } from '../../../interfaces/file'

// Create user
const CreateWebService = async (req: Request) => {
  // @ts-ignore
  const payloads: Customers = req.body
  const customerId = await generateUniqueCustomerId('c')
  payloads.uniqueId = customerId

  if (payloads.profileImage) {
    // @ts-ignore
    const file = req.file as IUploadFile
    const uploadedImage = await FileUploads.uploadToCloudinary(file)
    if (uploadedImage) {
      payloads.profileImage = uploadedImage.secure_url
    }
  } else {
    payloads.profileImage = await placeholderUser()
  }

  // image setup
  // const filePath = `/${req.file?.destination}${req.file?.originalname}`
  // if (filePath) {
  //   payloads.profileImage = filePath
  // }

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
    const existingEmail = await tx.customers.findUnique({
      where: { email: payloads.email },
    })

    if (existingEmail) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists.')
    }

    // Check if phone number already exists
    const existingPhoneNo = await tx.customers.findUnique({
      where: { phoneNo: payloads.phoneNo },
    })

    if (existingPhoneNo) {
      throw new ApiError(httpStatus.CONFLICT, 'Phone number already exists.')
    }

    const result = await tx.customers.create({ data: payloads })

    // Generate access token
    const accessToken = jwtTokenProvider.createToken(
      {
        uniqueId: result?.uniqueId,
        role: result?.role,
        status: result?.status,
      },
      PAYLOADS.ACCESS_TOKEN as Secret,
      PAYLOADS.ACCESS_TOKEN_EXPIRE_IN as string,
    )

    // Generate refresh token
    // const refreshToken = jwtTokenProvider.createToken(
    //   {
    //     uniqueId: result?.uniqueId,
    //     role: result?.role,
    //     status: result?.status,
    //   },
    //   PAYLOADS.REFRESH_TOKEN as Secret,
    //   PAYLOADS.REFRESH_TOKEN_EXPIRE_IN as string,
    // )

    return { ...result, token: accessToken }
  })
}

export const UserWebService = {
  CreateWebService,
}
