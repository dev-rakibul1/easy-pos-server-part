import { Prisma, Purchase } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniquePurchaseIds } from '../../../utilities/purchaseIdGen/purchaseIdGen'
import { generateUniqueSupplierPaymentId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IPurchaseFilterRequest } from './purchase.type'

// Create purchase
const CreatePurchaseService = async (data: any) => {
  const { variants, purchase, supplierPayment } = data

  purchase.forEach((pur: any) => {
    delete pur.productName
    delete pur.brandName
  })

  // Initialize arrays to store updated and created purchases
  const updatedPurchases: any[] = []
  const createdPurchases: any[] = []

  // console.log(newData)

  return await prisma.$transaction(async tx => {
    // Iterate through each purchase
    for (const purchaseItem of purchase) {
      // Check if the purchase already exists
      const existingPurchase = await tx.purchase.findFirst({
        where: {
          userId: purchaseItem.userId,
          productId: purchaseItem.productId,
          supplierId: purchaseItem.supplierId,
        },
      })

      // If the purchase exists, update it
      if (existingPurchase) {
        if (variants.length) {
          await tx.variants.createMany({ data: variants })
          const updatedPurchase = await tx.purchase.update({
            where: { id: existingPurchase.id },
            data: {
              sellingPrice: purchaseItem.sellingPrice,
              purchaseRate: purchaseItem.purchaseRate,
              vats: purchaseItem.vats,
              discounts: purchaseItem.discounts,
              color: purchaseItem.color,
              totalPrice: purchaseItem.totalPrice,
              othersStock: purchaseItem.othersStock,
              productStock: purchaseItem.productStock,
              ram: purchaseItem.ram,
              room: purchaseItem.room,
            },
          })

          updatedPurchases.push(updatedPurchase)
        }
      } else {
        // Purchase does not exist, proceed with creation

        // purchase product id updated
        const uniqueUpdateId = await generateUniquePurchaseIds(
          'PUR',
          purchase.length,
        )
        const newData = purchase.map((item: Purchase, index: number) => {
          return { ...item, uniqueId: uniqueUpdateId[index] }
        })

        // Create the new purchase
        await tx.variants.createMany({ data: variants })
        const createdPurchase = await tx.purchase.createMany({
          data: newData,
        })

        createdPurchases.push(createdPurchase)
      }
    }

    // ------------SUPPLIER PAYMENT INFORMATION------------
    const supplierPaymentId = await generateUniqueSupplierPaymentId('spd')

    const totalPrice1 = updatedPurchases.reduce(
      (accumulator, item) => accumulator + item.totalPrice,
      0,
    )
    const totalPrice2 = createdPurchases.reduce(
      (accumulator, item) => accumulator + item.totalPrice,
      0,
    )
    const subTotalPrice = totalPrice1 // 500
    const totalDueBalance =
      parseFloat(subTotalPrice) - parseFloat(supplierPayment.totalPay)

    const createSubTotalPrice =
      parseFloat(totalPrice2) - parseFloat(supplierPayment.totalPay)

    // Check if the purchase already exists
    const isExistingSupplierAndUser = await tx.supplierPayment.findFirst({
      where: {
        userId: supplierPayment.userId,
        supplierId: supplierPayment.supplierId,
      },
    })

    const supplierPaymentInfo = {
      totalPay: supplierPayment.totalPay || 0,
      totalSellPrice: subTotalPrice || 0,
      totalDue: totalDueBalance,
      supplierId: supplierPayment.supplierId,
      userId: supplierPayment.userId,
      uniqueId: supplierPaymentId,
    }

    // If the purchase exists, update it
    if (isExistingSupplierAndUser) {
      await tx.supplierPayment.update({
        where: { id: isExistingSupplierAndUser.id },
        data: {
          totalPay:
            isExistingSupplierAndUser?.totalPay + supplierPayment.totalPay,
          totalSellPrice:
            isExistingSupplierAndUser?.totalSellPrice + subTotalPrice,
          totalDue: isExistingSupplierAndUser?.totalDue + totalDueBalance,
        },
      })
    } else {
      await tx.supplierPayment.create({
        data: supplierPaymentInfo,
      })
    }

    return { updatedPurchases, createdPurchases }
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
    },
  })

  const total = await prisma.purchase.count()

  return {
    meta: { limit, page, total },
    data: result,
  }
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
      additionalPurchase: true,
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
}
