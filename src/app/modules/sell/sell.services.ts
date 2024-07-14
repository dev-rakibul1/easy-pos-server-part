import { Prisma, Sells } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import {
  generateUniqueInvoiceGroupId,
  generateUniqueSellId,
} from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { sellFilterablePartialSearch } from './sell.constant'
import { ISellFilterRequest, ISellsType } from './sell.type'

// Create multiple sell service
const CreateSellService = async (payloads: ISellsType) => {
  const sellGroupInvoiceId = await generateUniqueInvoiceGroupId('SIN')
  const sellId = await generateUniqueSellId('Sel')

  const { variants, sells, customerPayInUser } = payloads

  sells?.forEach((pur: Sells) => {
    if (pur?.purchaseRate !== undefined) {
      // @ts-ignore
      pur.purchaseRate = Number(parseFloat(pur.purchaseRate).toFixed(2))
    }
  })

  // Total product sell price
  const totalProductPrice = sells?.reduce(
    (accumulator: number, item: Sells) => accumulator + item?.totalSellPrice,
    0,
  )

  // -------------------Sells Group-------------------
  const sellGroupInformation = {
    customerId: customerPayInUser?.customerId,
    userId: customerPayInUser?.userId,
    uniqueId: sellGroupInvoiceId,
  }

  const sellGroup = await prisma.sellGroups.create({
    data: sellGroupInformation,
  })

  //------------------USER SELLS------------------
  return prisma.$transaction(async tx => {
    // Generate user sell entries
    const userSellEntries = {
      quantity: variants.length,
      totalPurchaseAmounts: totalProductPrice,
      totalDue: totalProductPrice - customerPayInUser.totalPay,
      totalPay: customerPayInUser.totalPay,
      customerId: customerPayInUser.customerId,
      userId: customerPayInUser.userId,
      paymentType: customerPayInUser.paymentType,
      sellGroupId: sellGroup.id,
    }

    // Create customer purchase
    await tx.customerPurchase.create({
      data: userSellEntries,
    })

    // -----------Customer purchase product----------
    const ids = sells.map((sell: Sells) => sell.productId)

    // Fetch data for each id
    const dataPromises = ids.map(id => tx.product.findUnique({ where: { id } }))
    const products = await Promise.all(dataPromises)

    const userId = customerPayInUser.userId
    const sellGroupId = sellGroup.id
    const customerId = customerPayInUser.customerId

    // customer purchase product information or data
    const newProducts = products.map(product => {
      // @ts-ignore
      const { uniqueId, id, ...restProduct } = product

      return {
        ...restProduct,
        userId,
        sellGroupId,
        customerId,
        productId: id,
      }
    })

    // Store the new products in the createdCustomerPurchaseProducts table and get the created objects
    const createdProductsPromises = newProducts.map(newProduct =>
      tx.customerPurchaseProducts.create({ data: newProduct }),
    )
    const createdCustomerPurchaseProducts = await Promise.all(
      createdProductsPromises,
    )

    const createdSellsIds = createdCustomerPurchaseProducts.map(id => id.id)

    // Extract the created purchase IDs and map them to product IDs
    const productIdToSellsIdMap: any = {}
    createdCustomerPurchaseProducts.forEach((product, index) => {
      productIdToSellsIdMap[newProducts[index].productId] = product.id
    })

    // Supplier sell variants create
    const isMatchWithProduct = variants
      .filter(va => productIdToSellsIdMap.hasOwnProperty(va.productId))
      .map(va => {
        const customerPurchaseProductId = productIdToSellsIdMap[va.productId]
        const { productId, ...rest } = va
        return {
          ...rest,
          customerPurchaseProductId,
        }
      })

    isMatchWithProduct?.map(ve => {
      // @ts-ignore
      delete ve.variantId
    })

    // Extract variantIds from variants array
    const variantIdsList = variants.map(variant => variant.variantId)

    // Check if each variantId exists
    const isExistVariant = await Promise.all(
      variantIdsList.map(id =>
        tx.variants.findFirst({
          where: { id },
        }),
      ),
    )

    // Check if all variants exist
    if (isExistVariant.some(variant => !variant)) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'One or more variants are invalid',
      )
    }

    // Create the variants in the customerPurchaseVariants table
    const createCustomerPurchaseVariants = await Promise.all(
      isMatchWithProduct.map(data =>
        tx.customerPurchaseVariants.create({ data }),
      ),
    )

    const createdVariantIds = createCustomerPurchaseVariants?.map(id => id.id)

    // Fetch data for each id
    const sales = sells.map((sell, index) => {
      const customerPurchaseProductId =
        createdSellsIds[index % createdSellsIds.length]

      const customerPurchaseVariantId =
        createdVariantIds[index % createdVariantIds.length]

      return {
        ...sell,
        uniqueId: sellId,
        customerPurchaseProductId,
        customerPurchaseVariantId,
      }
    })

    // -------------SELL & VARIANTS------------
    sales.map(del => {
      // @ts-ignore
      delete del?.customerName
    })

    const sellCreated = await tx.sells.createMany({ data: sales })

    if (sellCreated) {
      await tx.variants.deleteMany({
        where: {
          id: { in: variantIdsList },
        },
      })
    }

    return sellCreated
  })
}

// get all user
const GetAllSellService = async (
  filters: ISellFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Sells[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: sellFilterablePartialSearch.map(field => ({
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
  const whereConditions: Prisma.SellsWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.sells.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },

    include: {
      customer: true,
      user: true,
    },
  })

  const total = await prisma.sells.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}

const GetAllSellByCurrentDateService = async (): Promise<Sells[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const result = await prisma.sells.findMany({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },

    orderBy: {
      createdAt: 'desc',
    },
    include: {
      customer: true,
      user: true,
    },
  })

  return result
}
const GetAllSellByCurrentWeekService = async (): Promise<Sells[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current week (Monday)
  const startOfWeek = new Date(today)
  const dayOfWeek = startOfWeek.getDay()
  const diffToMonday = (dayOfWeek + 6) % 7 // Calculate difference to Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday)

  // Get the end of the current week (Sunday)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 7)

  const result = await prisma.sells.findMany({
    where: {
      createdAt: {
        gte: startOfWeek,
        lt: endOfWeek,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      customer: true,
      user: true,
    },
  })

  return result
}
// Get all sells by current month
const GetAllSellByCurrentMonthService = async (): Promise<Sells[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Get the start of the next month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

  const result = await prisma.sells.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      customer: true,
      user: true,
    },
  })

  return result
}

const SellGetByCustomerPurchaseIdService = async (
  id: string,
): Promise<Sells | null> => {
  const result = await prisma.sells.findFirst({
    where: {
      customerPurchaseProductId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      customer: true,
      user: true,
    },
  })

  return result
}

export const SellService = {
  CreateSellService,
  GetAllSellService,
  GetAllSellByCurrentDateService,
  GetAllSellByCurrentWeekService,
  GetAllSellByCurrentMonthService,
  SellGetByCustomerPurchaseIdService,
}
