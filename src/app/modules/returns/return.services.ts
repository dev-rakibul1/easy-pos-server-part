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
}

type IReturnPayloads = {
  variants: any[]
  payloads: any[]
  supplierReturn: ISupplierReturn
}

// Create multiple sell service
const CreateReturnService = async (data: IReturnPayloads) => {
  const returnId = await generateUniqueReturnId('r')
  const returnInvoiceId = await generateUniqueReturnGroupId('RIn')

  const { variants, payloads, supplierReturn } = data

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
    const currentReturnAmount =
      supplierReturn.totalReturnAmount - supplierReturn.totalPay
    // Generate supplier sell entries
    const returnAmountEntries = {
      quantity: variants.length,
      totalReturnAmount: supplierReturn.totalReturnAmount,
      totalDue: currentReturnAmount,
      totalPay: supplierReturn.totalPay,
      supplierId: supplierReturn.supplierId,
      userId: supplierReturn.userId,
      productId: supplierReturn.productId,
      returnGroupId: returnGroup.id,
    }

    // Create supplier sells
    const createdSupplierSells = await tx.supplierSell.create({
      data: returnAmountEntries,
    })

    const ids = payloads.map((ret: Returns) => ret.variantId)

    // Fetch data for each id
    const dataPromises = ids.map(id =>
      tx.variants.findUnique({ where: { id } }),
    )
    const variants = await Promise.all(dataPromises)

    // Check if all variants exist
    if (variants.some(variant => !variant)) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product does not exist.')
    }

    // Customer purchase product information or data
    const variantsInfo = variants.map((variant, index) => {
      // @ts-ignore
      const { createdAt, updatedAt, status, id, ...restProduct } = variant

      return {
        ...restProduct,
        uniqueId: `${String(returnId + index).padStart(6, '0')}`,
        productId: id,
      }
    })

    console.log('______', variantsInfo)

    // Check supplier, user & product
    const supplierCheck = payloads.map((ret: Returns, index) => {
      return {
        ...variantsInfo[index],
        supplierId: ret.supplierId,
        userId: ret.userId,
        productId: ret.productId,
        variantId: ret.variantId,
      }
    })

    console.log('supplierCheck', supplierCheck)

    // Fetch data for each id
    const isMatchWithPurchase = supplierCheck.map(id =>
      tx.purchase.findFirst({
        where: {
          supplierId: id.supplierId,
          userId: id.userId,
          productId: id.productId,
        },
      }),
    )
    const isExistSupplier = await Promise.all(isMatchWithPurchase)

    // Check if all variants exist
    if (isExistSupplier.some(variant => !variant)) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'This product does not belong to the specified supplier.',
      )
    }

    // --------------
    // Fetch data for each id
    const isMatchWithSupplierSell = supplierCheck.map(id =>
      tx.supplierSell.findFirst({
        where: {
          supplierId: id.supplierId,
          userId: id.userId,
          productId: id.productId,
        },
      }),
    )
    const isExistSupplierSell = await Promise.all(isMatchWithSupplierSell)
    console.log(isExistSupplierSell)

    // Create user return
    const createdReturnPromises = supplierCheck.map(ret =>
      tx.returns.create({ data: ret }),
    )
    if (createdReturnPromises) {
      await tx.variants.deleteMany({ where: { id: { in: ids } } })
    }

    await Promise.all(createdReturnPromises)
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

export const ReturnService = {
  CreateReturnService,
  GetAllReturnService,
}
