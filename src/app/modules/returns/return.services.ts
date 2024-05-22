import { Returns } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import prisma from '../../../shared/prisma'
import { generateUniqueReturnId } from '../../../utilities/uniqueIdGenerator'

// Create multiple sell service
const CreateReturnService = async (payloads: Returns) => {
  const returnId = await generateUniqueReturnId('r')
  // @ts-ignore
  payloads.uniqueId = returnId
  const productId = payloads.variantId

  return prisma.$transaction(async tx => {
    const isProductExist = await tx.variants.findUnique({
      where: { id: productId },
    })

    if (!isProductExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product does not exist.')
    }

    const returnProductInfo = {
      imeiNumber: isProductExist?.imeiNumber,
      ram: isProductExist?.ram,
      rom: isProductExist?.rom,
      color: isProductExist?.color,
      purchaseRate: isProductExist?.purchaseRate,
      sellingPrice: isProductExist?.sellingPrice,
      vats: isProductExist?.vats,
      discounts: isProductExist?.discounts,
      variantId: isProductExist?.id,
      supplierId: payloads.supplierId,
      userId: payloads.userId,
      productId: payloads.productId,
    }
    const returnInfo = {
      ...returnProductInfo,
      productName: payloads.productName,
      modelName: payloads.modelName,
      uniqueId: returnId,
    }

    const supplierOwnProductCheck = await tx.purchase.findFirst({
      where: {
        supplierId: payloads.supplierId,
        userId: payloads.userId,
        productId: payloads.productId,
      },
    })

    if (!supplierOwnProductCheck) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'This product does not belong to the specified supplier.',
      )
    }

    const returnProduct = await tx.returns.create({ data: returnInfo })
    if (returnProduct) {
      await tx.variants.delete({ where: { id: productId } })
    }

    const searchSupplierPayment = await tx.supplierPayment.findFirst({
      where: {
        supplierId: payloads.supplierId,
        userId: payloads.userId,
      },
    })

    if (!searchSupplierPayment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Payment does not exist')
    }

    if (searchSupplierPayment.totalDue < isProductExist.purchaseRate) {
      const paymentCalculate = async (prevDue: number, refund: number) => {
        const change = prevDue - refund
        if (prevDue < refund) {
          await tx.supplierPayment.update({
            where: { id: searchSupplierPayment.id },
            data: {
              totalDue: 0,
              totalSellPrice:
                searchSupplierPayment.totalSellPrice -
                isProductExist.purchaseRate,
            },
          })
        }

        throw new ApiError(
          httpStatus.CONFLICT,
          `Please refund ${change} balance in the seller.`,
        )
      }
    } else {
      const pevDueAmount =
        searchSupplierPayment.totalDue - isProductExist.purchaseRate

      console.log(isProductExist)

      await tx.supplierPayment.update({
        where: { id: searchSupplierPayment.id },
        data: {
          totalDue: pevDueAmount,
          totalSellPrice:
            searchSupplierPayment.totalSellPrice - isProductExist.purchaseRate,
        },
      })
    }

    return returnProduct
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
