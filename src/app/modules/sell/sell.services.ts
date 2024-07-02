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
      // productId: customerPayInUser.productId,
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

    console.log(isMatchWithProduct)

    isMatchWithProduct?.map(ve => {
      // @ts-ignore
      delete ve.variantId
    })

    // Extract variantIds from variants array
    const variantIdsList = variants.map(variant => variant.variantId)
    console.log(variantIdsList)

    // Check if each variantId exists
    const isExistVariant = await Promise.all(
      variantIdsList.map(id =>
        tx.variants.findFirst({
          where: { id },
        }),
      ),
    )

    console.log('130 line', { variants })

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

// const CreateSellService = async (payloads: any) => {
//   const { data, ids } = payloads
//   // Generate unique IDs for each sell
//   const uniqueSellIds = await Promise.all(
//     data.map(async () => await generateUniqueSellId('sel')),
//   )

//   // Initialize an array to hold the results of the creation operation
//   const createdSells: Sells[] = []

//   // Use Prisma transaction for atomicity
//   return prisma.$transaction(async tx => {
//     // Loop through each payload
//     for (let i = 0; i < data.length; i++) {
//       const payload = data[i]
//       const sellId = uniqueSellIds[i]
//       payload.uniqueId = sellId

//       const variantId = payload.variantId

//       // console.log(payload)

//       // Check if the variant exists
//       const isVariantExist = await tx.variants.findUnique({
//         where: { id: variantId },
//       })

//       if (!isVariantExist) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Product does not exist')
//       }

//       // Create sell variant
//       const sellVariantsInfo = {
//         imeiNumber: isVariantExist.imeiNumber,
//         ram: isVariantExist.ram,
//         rom: isVariantExist.rom,
//         color: isVariantExist.color,
//       }

//       const createSellVariant = await tx.sellVariants.create({
//         data: sellVariantsInfo,
//       })

//       // Associate sell with sell variant
//       payload.sellVariantId = createSellVariant.id

//       // Create sell
//       const productSell = await tx.sells.create({ data: payload })

//       // Delete the variant
//       if (productSell) {
//         await tx.variants.delete({ where: { id: variantId } })
//       }

//       // Push the created sell to the result array
//       createdSells.push(productSell)
//     }

//     //----------------PAYMENT CREATE--------------
//     const customerPaymentId = await generateUniqueCustomerPaymentId('cpd')
//     // Check if the purchase already exists
//     const isPaymentExist = await tx.customerPayments.findFirst({
//       where: {
//         userId: ids.userId,
//         customerId: ids.customerId,
//       },
//     })

//     const totalPay = data.reduce(
//       (accumulator: number, item: Sells) => accumulator + item.totalPay,
//       0,
//     )
//     const totalSellPrice = data.reduce(
//       (accumulator: number, item: Sells) => accumulator + item.totalSellPrice,
//       0,
//     )

//     const totalDue = totalSellPrice - totalPay

//     // Payment APIs data
//     const paymentInfo = {
//       totalPay,
//       totalSellPrice,
//       totalDue,
//       uniqueId: customerPaymentId,
//       customerId: ids.customerId,
//       userId: ids.userId,
//     }

//     if (!isPaymentExist) {
//       await tx.customerPayments.create({
//         data: paymentInfo,
//       })
//     } else {
//       await tx.customerPayments.update({
//         where: { id: isPaymentExist.id },
//         data: {
//           totalPay: isPaymentExist.totalPay + totalPay,
//           totalSellPrice: isPaymentExist.totalSellPrice + totalSellPrice,
//           totalDue: isPaymentExist.totalDue + totalDue,
//         },
//       })
//     }

//     return createdSells
//   })
// }

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

export const SellService = {
  CreateSellService,
  GetAllSellService,
}
