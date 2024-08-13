import { Returns } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import {
  generateUniqueReturnGroupId,
  generateUniqueReturnId,
} from '../../../utilities/uniqueIdGenerator'

type ISupplierReturn = {
  userId: string
  supplierId: string
  productId: string
  totalPay: number
  totalReturnAmount: number
  paymentType: string
}

type IReturnPayloads = {
  variants: any[]
  payloads: any[]
  supplierReturn: ISupplierReturn
}

const CreateReturnService = async (
  data: IReturnPayloads,
): Promise<Returns | null> => {
  const returnId = await generateUniqueReturnId('r')
  const returnInvoiceId = await generateUniqueReturnGroupId('RIn')

  const { variants: clientVariants, payloads, supplierReturn } = data

  // Total product sell price
  const totalReturnAmount = payloads.reduce(
    (accumulator: number, item) => accumulator + Number(item.totalSellPrice),
    0,
  )
  // @ts-ignore
  return prisma.$transaction(async tx => {
    // --------Purchase Group----------
    const returnGroupInformation = {
      supplierId: supplierReturn.supplierId,
      userId: supplierReturn.userId,
      uniqueId: returnInvoiceId,
    }

    const returnGroup = await tx.returnGroups.create({
      data: returnGroupInformation,
    })

    //------SUPPLIER SELLS---------
    // Generate supplier sell entries
    const returnAmountEntries = {
      quantity: clientVariants.length,
      totalReturnAmount: totalReturnAmount,
      totalDue: totalReturnAmount - supplierReturn.totalPay,
      totalPay: supplierReturn.totalPay,
      supplierId: supplierReturn.supplierId,
      userId: supplierReturn.userId,
      productId: supplierReturn.productId,
      returnGroupId: returnGroup.id,
      paymentType: supplierReturn.paymentType,
    }

    // Create supplier sells
    await tx.supplierReturnPayments.create({
      data: returnAmountEntries,
    })

    // -----------Supplier sell product----------
    const ids = payloads.map(id => id.productId)

    // Fetch data for each id
    const dataPromises = ids.map(id => tx.product.findUnique({ where: { id } }))
    const products = await Promise.all(dataPromises)

    const userId = supplierReturn.userId
    const returnGroupId = returnGroup.id
    const supplierId = returnGroup.supplierId

    const newProducts = products.map(product => {
      // @ts-ignore
      const { uniqueId, id, ...restProduct } = product
      return {
        ...restProduct,
        userId,
        returnGroupId,
        supplierId,
        productId: id,
      }
    })

    // Store the new products in the supplierSellProduct table and get the created objects
    const createdProductsPromises = newProducts.map(newProduct =>
      tx.userReturnProducts.create({ data: newProduct }),
    )
    const createdSupplierSellProducts = await Promise.all(
      createdProductsPromises,
    )

    const createdReturnIds = createdSupplierSellProducts.map(id => id.id)

    // --------------RETURN INFO-------------
    // Customer purchase product information or data
    const variantIds = clientVariants.map(id => id.variantId)

    const existVariantSearching = await Promise.all(
      variantIds.map(id => tx.variants.findFirst({ where: { id } })),
    )

    const isExistingVariants = existVariantSearching.filter(Boolean)

    if (isExistingVariants.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, `Invalid variant-1`)
    }

    const variantsInfo = isExistingVariants.map((variant, index) => {
      // @ts-ignore
      const { createdAt, updatedAt, status, id, ...restProduct } = variant
      return {
        ...restProduct,
        uniqueId: `${String(returnId + index).padStart(6, '0')}`,
      }
    })

    // Check supplier, user & product
    const supplierCheck = clientVariants.map((ret: Returns, index) => {
      const userReturnProductsId =
        createdReturnIds[index % createdReturnIds.length]
      return {
        ...variantsInfo[index],
        supplierId: ret.supplierId,
        userId: ret.userId,
        // productId: ret.productId,
        variantId: ret.variantId,
        userReturnProductsId,
      }
    })

    // Extract the created purchase IDs and map them to product IDs
    const productIdToPurchaseIdMap: any = {}
    createdSupplierSellProducts.forEach((product, index) => {
      productIdToPurchaseIdMap[newProducts[index].productId] = product.id
    })

    // Supplier sell variants create
    clientVariants
      .filter(va => productIdToPurchaseIdMap.hasOwnProperty(va.productId))
      .map(va => {
        const userReturnProductsId = productIdToPurchaseIdMap[va.productId]
        const { productId, ...rest } = va
        return {
          ...rest,
          userReturnProductsId,
        }
      })

    // Update return data
    const updateReturnData = supplierCheck.map((obj, index) => {
      const returnObj = payloads[index % payloads.length]
      return { ...obj, price: parseFloat(returnObj?.totalSellPrice) }
    })

    const createdReturnPromises = updateReturnData.map(ret => {
      const { purchaseId, ...rest } = ret
      // @ts-ignore
      ret.price = parseFloat(ret.price)
      // @ts-ignore
      return tx.returns.create({ data: rest })
    })

    const createdReturns = await Promise.all(createdReturnPromises)
    const returnIds = createdReturns.map(ret => ret.variantId)
    const stockOutVariant = returnIds.map(id =>
      tx.variants.delete({ where: { id } }),
    )

    await Promise.all(stockOutVariant)

    // console.log('createdReturnPromises', getStockOutVariants)
    // console.log('createdReturns', createdReturns)
    return createdReturns
  })
}

// get all user
const GetAllReturnService = async (): Promise<Returns[] | null> => {
  const result = await prisma.returns.findMany({
    include: {
      supplier: true,
    },
  })
  return result
}

// get all user
const GetAllReturnByCurrentDateService = async (): Promise<
  Returns[] | null
> => {
  // Current date
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const result = await prisma.returns.findMany({
    include: {
      supplier: true,
    },
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return result
}
// get all return depended current week
const GetAllReturnByCurrentWeekService = async (): Promise<
  Returns[] | null
> => {
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

  const result = await prisma.returns.findMany({
    include: {
      supplier: true,
    },
    where: {
      createdAt: {
        gte: startDate,
        lt: today,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return result
}
// get all return depended current month
const GetAllReturnByCurrentMonthService = async (): Promise<
  Returns[] | null
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the start of the current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  // Get the start of the next month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const result = await prisma.returns.findMany({
    include: {
      supplier: true,
    },
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return result
}
// get all return depended current month
const GetAllReturnByCurrentYearService = async (): Promise<
  Returns[] | null
> => {
  // Current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Date one year ago
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const result = await prisma.returns.findMany({
    include: {
      supplier: true,
    },
    where: {
      createdAt: {
        gte: oneYearAgo,
        lt: today,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return result
}

export const ReturnService = {
  CreateReturnService,
  GetAllReturnService,
  GetAllReturnByCurrentDateService,
  GetAllReturnByCurrentWeekService,
  GetAllReturnByCurrentMonthService,
  GetAllReturnByCurrentYearService,
}
