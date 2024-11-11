import { Prisma, Purchase } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import {
  generateUniqueInvoiceId,
  generateUniquePurchaseId,
} from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IPurchaseFilterRequest, IPurchaseType } from './purchase.type'

// Create purchase
const CreatePurchaseService = async (data: IPurchaseType) => {
  const purchaseId = await generateUniquePurchaseId('pur')
  const invoiceId = await generateUniqueInvoiceId('Inv')
  const { variants, purchase, supplierPayment } = data
  // Remove unnecessary fields from purchase
  purchase.forEach((pur: any) => {
    delete pur.productName
    delete pur.brandName
  })

  // Total product sell price
  const totalProductPrice = purchase.reduce(
    (accumulator: number, item: Purchase) => accumulator + item.totalPrice,
    0,
  )

  return prisma.$transaction(async tx => {
    // --------Purchase Group----------
    const purchaseGroupInformation = {
      supplierId: supplierPayment.supplierId,
      userId: supplierPayment.userId,
      uniqueId: invoiceId,
    }

    const purchaseGroup = await tx.purchaseGroup.create({
      data: purchaseGroupInformation,
    })

    //------SUPPLIER SELLS---------
    // Generate supplier sell entries
    const supplierSellEntries = {
      quantity: variants.length,
      totalSellAmounts: totalProductPrice,
      totalDue: totalProductPrice - supplierPayment.totalPay,
      totalPay: supplierPayment.totalPay,
      supplierId: supplierPayment.supplierId,
      userId: supplierPayment.userId,
      productId: supplierPayment.productId,
      purchaseGroupId: purchaseGroup.id,
      paymentType: supplierPayment.paymentType,
    }

    // Create supplier sells
    const createdSupplierSells = await tx.supplierSell.create({
      data: supplierSellEntries,
    })

    // -----------Supplier sell product----------
    const ids = purchase.map((purchase: Purchase) => purchase.productId)

    // Fetch data for each id
    const dataPromises = ids.map(id =>
      tx.product.findUnique({ where: { id }, include: { variants: true } }),
    )
    const products = await Promise.all(dataPromises)

    const userId = supplierPayment.userId
    const purchaseGroupId = purchaseGroup.id
    const supplierId = supplierPayment.supplierId

    const newProducts = products.map(product => {
      // @ts-ignore
      const { uniqueId, id, status, variants, ...restProduct } = product

      return {
        ...restProduct,
        userId,
        purchaseGroupId,
        supplierId,
        productId: id,
      }
    })

    // Store the new products in the supplierSellProduct table and get the created objects
    const createdProductsPromises = newProducts.map(newProduct =>
      tx.supplierSellProduct.create({ data: newProduct }),
    )
    const createdSupplierSellProducts = await Promise.all(
      createdProductsPromises,
    )

    const createdPurchaseIds = createdSupplierSellProducts.map(id => id.id)

    // Fetch data for each id
    const purchases = purchase.map((purchase, index) => {
      const supplierSellProductId =
        createdPurchaseIds[index % createdPurchaseIds.length]
      return {
        ...purchase,
        supplierSellProductId,
        uniqueId: purchaseId,
        supplierSellId: createdSupplierSells.id,
      }
    })

    // Extract the created purchase IDs and map them to product IDs
    const productIdToPurchaseIdMap: any = {}
    createdSupplierSellProducts.forEach((product, index) => {
      productIdToPurchaseIdMap[newProducts[index].productId] = product.id
    })

    // Supplier sell variants create
    const isMatchWithProduct = variants
      .filter(va => productIdToPurchaseIdMap.hasOwnProperty(va.productId))
      .map(va => {
        const supplierSellProductId = productIdToPurchaseIdMap[va.productId]
        const { productId, ...rest } = va
        return {
          ...rest,
          supplierSellProductId,
        }
      })

    // Create the variants in the supplierSellVariants table
    await tx.supplierSellVariants.createMany({
      data: isMatchWithProduct,
    })

    // --------PURCHASE & VARIANTS--------
    // Create purchases
    // Create purchases individually and store the created records
    const createdPurchases = await Promise.all(
      purchases.map(purchase => tx.purchase.create({ data: purchase })),
    )

    // Match purchases with variants
    createdPurchases.filter(pur => {
      const matchingVariant = variants.find(
        va => va.productId === pur.productId,
      )
      return matchingVariant !== undefined
    })

    // Map new variants info
    const newVariantsInfo = variants.map(variant => {
      const matchingPurchase = createdPurchases.find(
        purchase => purchase.productId === variant.productId,
      )
      if (matchingPurchase) {
        return {
          ...variant,
          purchaseId: matchingPurchase.id,
        }
      }
      return variant
    })

    // const checkProductStock = await prisma.product.findUnique(())

    await tx.variants.createMany({
      data: newVariantsInfo,
    })

    // Fetch data for each id
    const checkProductStock = ids.map(id =>
      tx.product.findUnique({ where: { id } }),
    )
    // const stockProduct = products?.map((pro) => {
    //   return
    // })

    // await tx.variants.createMany({
    //   data: variants,
    // })
    // const result = await tx.purchase.createMany({ data: purchases })

    // Check the product last stock

    const isExistProduct = ids.map(id =>
      tx.product.findUnique({ where: { id }, include: { variants: true } }),
    )

    const stockInProducts = await Promise.all(isExistProduct)

    await Promise.all(
      stockInProducts.map(async pro => {
        if (pro?.variants && pro?.variants?.length > 0) {
          await tx.product.updateMany({
            where: { id: pro.id },
            data: { status: true },
          })
        } else {
          if (!pro?.variants && pro?.variants?.length === 0) {
            await tx.product.updateMany({
              where: { id: pro.id },
              data: { status: false },
            })
          }
        }
      }),
    )

    return createdPurchases
  })
}

// get all purchase
const GetAllCreatePurchaseService = async (
  filters: IPurchaseFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Purchase[]>> => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  // searchTerm
  if (searchTerm) {
    andConditions.push({
      OR: ['color', 'uniqueId'].map(field => ({
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
  const whereConditions: Prisma.PurchaseWhereInput = andConditions.length
    ? { AND: andConditions }
    : {}

  const result = await prisma.purchase.findMany({
    where: whereConditions,
    skip,
    take: limit,

    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },

    include: {
      products: true,
      suppliers: true,
      users: true,
      supplierSellProduct: true,
      supplierSells: true,
    },
  })

  const total = await prisma.purchase.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
}
const GetAllPurchaseByCurrentDateService = async (): Promise<Purchase[]> => {
  // Current date
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const result = await prisma.purchase.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },

    orderBy: { createdAt: 'desc' },

    include: {
      products: true,
      suppliers: true,
      users: true,
      supplierSellProduct: true,
      supplierSells: true,
    },
  })

  return result
}
const GetAllPurchaseByCurrentWeekService = async (): Promise<Purchase[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Date 7 days ago
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // Ensure we do not go before the start of the month
  const startDate = sevenDaysAgo < startOfMonth ? startOfMonth : sevenDaysAgo

  const result = await prisma.purchase.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: today,
      },
    },

    orderBy: { createdAt: 'desc' },

    include: {
      products: true,
      suppliers: true,
      users: true,
      supplierSellProduct: true,
      supplierSells: true,
    },
  })

  return result
}

// get all purchase depended by current month
const GetAllPurchaseByCurrentMonthService = async (): Promise<Purchase[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Get the start of the next month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

  const result = await prisma.purchase.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },

    orderBy: { createdAt: 'desc' },

    include: {
      products: true,
      suppliers: true,
      users: true,
      supplierSellProduct: true,
      supplierSells: true,
    },
  })

  return result
}
// get all purchase depended by current month
const GetAllPurchaseByCurrentYearService = async (): Promise<Purchase[]> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Date one year ago
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const result = await prisma.purchase.findMany({
    where: {
      createdAt: {
        gte: oneYearAgo,
        lt: today,
      },
    },

    orderBy: { createdAt: 'desc' },

    include: {
      products: true,
      suppliers: true,
      users: true,
      supplierSellProduct: true,
      supplierSells: true,
    },
  })

  return result
}

// Purchase updated
const UpdateCreatePurchaseService = async (id: string, payloads: Purchase) => {
  try {
    return prisma.$transaction(async tx => {
      const isExist = await tx.purchase.findUnique({ where: { id: id } })
      if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Invalid purchase.')
      }

      const result = await tx.purchase.update({
        where: { id: id },
        data: payloads,
      })

      // console.log(result)

      const searchSupplierPayment = await tx.supplierPayment.findFirst({
        where: { userId: result.userId, supplierId: result.supplierId },
      })

      if (!searchSupplierPayment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Supplier payment not found.')
      }

      const previousAmount = isExist.totalPrice
      const currentPrice =
        searchSupplierPayment.totalSellPrice -
        previousAmount +
        result.sellingPrice

      await tx.supplierPayment.update({
        where: { id: searchSupplierPayment.id },
        data: { totalSellPrice: currentPrice },
      })

      return result
    })
  } catch (error) {
    console.error('Error in UpdateCreatePurchaseService:', error)
    throw error // Rethrow the error for the caller to handle
  }
}

// Supplier And User Trans
const GetBuySupplierAndUserPurchaseService = async (ids: any) => {
  try {
    const obj = ids
    const [supplierId, userId] = obj.id.split(',')

    const result = await prisma.purchase.findMany({
      where: { supplierId: supplierId, userId: userId },
    })

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}
//Single purchase get
const GetSinglePurchaseService = async (id: string) => {
  const result = await prisma.purchase.findUnique({
    where: { id },
    include: {
      products: true,
      suppliers: true,
      users: true,
    },
  })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid purchase')
  }
  return result
}

export const PurchaseService = {
  CreatePurchaseService,
  GetAllCreatePurchaseService,
  UpdateCreatePurchaseService,
  GetBuySupplierAndUserPurchaseService,
  GetSinglePurchaseService,
  GetAllPurchaseByCurrentDateService,
  GetAllPurchaseByCurrentWeekService,
  GetAllPurchaseByCurrentMonthService,
  GetAllPurchaseByCurrentYearService,
}
