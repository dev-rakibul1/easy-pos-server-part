import { Prisma, Product } from '@prisma/client'
import { Request } from 'express'
import httpStatus from 'http-status'
import { placeholderProduct } from '../../../assets/placeholderImage'
import ApiError from '../../../errors/apiError'
import { FileUploads } from '../../../helpers/fileUploader'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniqueProductId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IUploadFile } from '../../interfaces/file'
import { IPaginationOptions } from '../../interfaces/pagination'
import { productFilterableKey } from './product.constant'
import { IProductFilterRequest } from './product.type'

// Create product
const CreateProductsService = async (req: Request) => {
  const payload: Product = req.body
  const productId = await generateUniqueProductId('p')
  payload.uniqueId = productId

  const file = req.file as IUploadFile
  console.log(24, file)

  if (payload.productImage) {
    const uploadedImage = await FileUploads.uploadToCloudinary(file)
    console.log(26, uploadedImage)
    if (uploadedImage) {
      payload.productImage = uploadedImage.secure_url
    }
  } else {
    payload.productImage = await placeholderProduct()
  }

  // const filePath = `/${req.file?.destination}${req.file?.originalname}`
  // if (filePath) {
  //   payload.productImage = filePath
  // }

  // @ts-ignore
  payload.productStock = payload.variants?.length

  // console.log(payload)
  // Save the product to the database
  const result = await prisma.product.create({ data: payload })
  return result
}

// get all product
const GetAllCreateUserService = async (
  filters: IProductFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Product[]>> => {
  // Filters
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // SearchTerm
  if (searchTerm) {
    andConditions.push({
      OR: productFilterableKey.map(field => ({
        [field]: {
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

  // Pagination
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Where condition
  const whereConditions: Prisma.ProductWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.product.findMany({
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
      variants: true,
      purchases: true,
    },
  })

  const total = await prisma.product.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

// get all product
const SingleProductGetService = async (id: string): Promise<Product | null> => {
  const isExist = await prisma.product.findUnique({ where: { id: id } })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid product.')
  }

  const result = await prisma.product.findUnique({
    where: { id: id },
    include: {
      variants: true,
      purchases: true,
    },
  })
  return result
}

// Update product
const UpdateProductGetService = async (
  id: string,
  payloads: Partial<Product>,
): Promise<Product | null> => {
  const isExist = await prisma.product.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid product.')
  }

  const result = await prisma.product.update({
    where: { id: id },
    data: payloads,
  })
  return result
}
// delete product
const DeleteProductGetService = async (id: string): Promise<Product | null> => {
  const isExist = await prisma.product.findUnique({ where: { id: id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid product.')
  }

  const result = await prisma.product.delete({
    where: { id: id },
  })
  return result
}
// Stock in product
const StockInProductGetService = async (): Promise<Product[] | null> => {
  const result = await prisma.product.findMany({
    where: {
      variants: {
        some: {},
      },
    },
    include: {
      variants: true,
    },
  })
  return result
}

// Stock in product by status
const StockInProductByStatusGetService = async (
  filters: IProductFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Product[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  andConditions.push({
    status: true,
  })

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: productFilterableKey.map(field => ({
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
  const whereConditions: Prisma.ProductWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.product.findMany({
    where: whereConditions,
    include: { variants: true, purchases: true },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.product.count({ where: { status: true } })

  return {
    meta: { limit, page, total },
    data: result,
  }
}
// Stock out product by status
const StockOutProductByStatusGetService = async (
  filters: IProductFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Product[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  andConditions.push({
    status: false,
  })

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: productFilterableKey.map(field => ({
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
  const whereConditions: Prisma.ProductWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.product.findMany({
    where: whereConditions,
    include: { variants: true },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  })

  const total = await prisma.product.count({ where: { status: false } })

  return {
    meta: { limit, page, total },
    data: result,
  }
}

export const ProductsService = {
  CreateProductsService,
  GetAllCreateUserService,
  SingleProductGetService,
  UpdateProductGetService,
  DeleteProductGetService,
  StockInProductGetService,
  StockInProductByStatusGetService,
  StockOutProductByStatusGetService,
}
