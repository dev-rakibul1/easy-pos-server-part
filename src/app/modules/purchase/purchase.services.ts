import { Prisma, Purchase } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import prisma from '../../../shared/prisma'
import { generateUniquePurchaseIds } from '../../../utilities/purchaseIdGen/purchaseIdGen'
import { generateUniqueSupplierPaymentId } from '../../../utilities/uniqueIdGenerator'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IPurchaseFilterRequest, IPurchaseType } from './purchase.type'

// Create purchase
const CreatePurchaseService = async (data: IPurchaseType) => {
  const { variants, purchase, supplierPayment } = data

  // Remove unnecessary fields from purchase
  purchase.forEach((pur: any) => {
    delete pur.productName
    delete pur.brandName
  })

  const updatedPurchases: Purchase[] = []
  const createdPurchases: Purchase[] = []
  // const supplierSells: any[] = []

  const totalProductPrice = purchase.reduce(
    (accumulator: number, item: Purchase) => accumulator + item.totalPrice,
    0,
  )
  return await prisma.$transaction(async tx => {
    //------------------SUPPLIER SELLS------------------
    // Generate supplier sell entries
    const supplierSellEntries = {
      quantity: variants.length,
      totalSellAmounts: totalProductPrice,
      totalDue: totalProductPrice - supplierPayment.totalPay,
      totalPay: supplierPayment.totalPay,
      supplierId: supplierPayment.supplierId,
      userId: supplierPayment.userId,
      productId: supplierPayment.productId,
    }

    // supplierSells.push(supplierSellEntries)

    // Create supplier sells
    const createdSupplierSells = await tx.supplierSell.create({
      data: supplierSellEntries,
    })

    console.log(createdSupplierSells)

    // Check if supplier sells were created successfully
    if (createdSupplierSells) {
      const supplierSellId = createdSupplierSells.id

      if (variants.length) {
        const supplierSellVariants = variants.map(variant => ({
          imeiNumber: variant.imeiNumber,
          ram: variant.ram,
          rom: variant.rom,
          color: variant.color,
          supplierSellId: supplierSellId,
        }))

        // Create supplier sell variants
        await tx.supplierSellVariants.createMany({
          data: supplierSellVariants,
        })
      }
    }

    //------------------PURCHASE & VARIANTS------------------
    for (const purchaseItem of purchase) {
      const existingPurchase = await tx.purchase.findFirst({
        where: {
          userId: purchaseItem.userId,
          productId: purchaseItem.productId,
          supplierId: purchaseItem.supplierId,
        },
      })

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
        const uniqueUpdateId = await generateUniquePurchaseIds(
          'PUR',
          purchase.length,
        )
        const newData = purchase.map((item: any, index: number) => ({
          ...item,
          uniqueId: uniqueUpdateId[index],
        }))

        // CRETE VARIANTS
        await tx.variants.createMany({ data: variants })

        // CREATE PURCHASE
        await tx.purchase.createMany({
          data: newData,
        })

        createdPurchases.push(...newData)
      }
    }

    // -------------------Supplier payments-------------------
    const totalPrice1 = createdPurchases.reduce(
      (accumulator: number, item: Purchase) => accumulator + item.totalPrice,
      0,
    )
    // const subTotalPrice = totalPrice1
    const totalDueBalance =
      // @ts-ignore
      parseFloat(totalPrice1) - parseFloat(supplierPayment.totalPay)

    const supplierPaymentId = await generateUniqueSupplierPaymentId('spd')

    // Supplier payment payloads or information
    const supplierPaymentInfo = {
      totalPay: supplierPayment.totalPay || 0,
      totalSellPrice: totalPrice1 || 0,
      totalDue: totalDueBalance,
      supplierId: supplierPayment.supplierId,
      userId: supplierPayment.userId,
      uniqueId: supplierPaymentId,
    }

    // Is data between supplier payment is exist so that we are searching payment
    const isExistingSupplierAndUser = await tx.supplierPayment.findFirst({
      where: {
        userId: supplierPayment.userId,
        supplierId: supplierPayment.supplierId,
      },
    })

    // Supplier payment create APIs
    if (isExistingSupplierAndUser) {
      await tx.supplierPayment.update({
        where: { id: isExistingSupplierAndUser.id },
        data: {
          totalPay:
            isExistingSupplierAndUser.totalPay + supplierPayment.totalPay,
          totalSellPrice:
            isExistingSupplierAndUser.totalSellPrice + totalPrice1,
          totalDue: isExistingSupplierAndUser.totalDue + totalDueBalance,
        },
      })
    } else {
      await tx.supplierPayment.create({
        data: supplierPaymentInfo,
      })
    }

    return {
      updatedPurchases,
      createdPurchases,
      // supplierSells,
    }
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
