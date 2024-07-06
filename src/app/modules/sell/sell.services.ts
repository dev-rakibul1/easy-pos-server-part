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

  // console.log(payloads)
  // console.log(customerPayInUser)

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
    const createdCustomerPurchase = await tx.customerPurchase.create({
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

export const SellService = {
  CreateSellService,
  GetAllSellService,
  GetAllSellByCurrentDateService,
}
