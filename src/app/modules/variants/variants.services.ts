import { Prisma, Variants } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IVariantFilterRequest } from './variants.type'

// Create user
const CreateVariantService = async (payload: Variants) => {
  const result = await prisma.variants.create({ data: payload })
  return result
}

// get all user
const GetAllCreateVariantService = async (
  filters: IVariantFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Variants[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // SearchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['imeiNumber', 'ram', 'rom', 'color'].map(field => ({
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
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Where condition
  const whereConditions: Prisma.VariantsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.variants.findMany({
    where: whereConditions,
    skip,
    take: limit,

    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },

    include: {
      product: true,
    },
  })

  const total = await prisma.variants.count()
  return {
    meta: { limit, page, total },
    data: result,
  }
}

// get all user
const DeleteSingleVariantService = async (id: string) => {
  const result = await prisma.variants.delete({ where: { id: id } })
  return result
}
// get all user
const GetSingleSingleVariantService = async (id: string) => {
  const result = await prisma.variants.findFirst({ where: { id: id } })
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid variants')
  return result
}
// to check the last stock
const LastStockCountService = async () => {
  // ----------------LAST STOCK IN--------------
  const variants = await prisma.variants.findMany({})
  const ids: string[] = []

  // Push purchaseId into ids array
  variants?.forEach((variant: Variants) => {
    ids.push(variant.purchaseId)
  })

  // Fetch stock data for each purchaseId
  const lastStock = await Promise.all(
    ids.map(async id => {
      const data = await prisma.variants.findMany({
        where: { purchaseId: id },
        select: {
          id: true,
          purchaseId: true,
        },
      })

      return data
    }),
  )

  // Map the lastStock to count occurrences of each purchaseId
  const result = lastStock.map(st => ({
    id: st[0].purchaseId,
    count: st.length,
  }))

  // Remove duplicates by purchaseId and get the unique counts
  const variantStockData = Array.from(
    new Map(result.map(item => [item.id, item])).values(),
  )

  const count = variantStockData.reduce((acc, item) => acc + item?.count, 0)

  // ----------------CALCULATION WITH STOCK--------------
  const purchase = await prisma.purchase.findMany({})

  const isMatchWithVariant = variantStockData?.map(stock => {
    const matchId = purchase.filter(pur => pur.id === stock.id)

    return matchId.map(item => {
      // @ts-ignore
      const purchaseRate = item?.totalPrice / item?.productStock || 0
      // console.log(purchaseRate)

      return {
        productId: item?.productId,
        uniqueId: item?.uniqueId,
        purchaseRateWithOutVatDiscount: item?.purchaseRate,
        vats: item?.vats,
        discounts: item?.discounts,
        purchaseRate: purchaseRate,
        totalStockPrice: purchaseRate * stock.count,
        sellingPrice: item?.sellingPrice * stock.count,
        totalPrice: item.totalPrice,
        purchaseId: item?.id,
        quantity: stock?.count,
      }
    })
  })

  // Remove duplicates by purchaseId and get the unique counts
  const data = isMatchWithVariant.flatMap(data => data)
  return { data, count }
}

export const VariantService = {
  CreateVariantService,
  GetAllCreateVariantService,
  DeleteSingleVariantService,
  GetSingleSingleVariantService,
  LastStockCountService,
}
