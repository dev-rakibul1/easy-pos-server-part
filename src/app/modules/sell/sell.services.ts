import { Sells } from '@prisma/client'
import prisma from '../../../shared/prisma'
import {
  generateUniqueCustomerPaymentId,
  generateUniqueSellId,
} from '../../../utilities/uniqueIdGenerator'

// Create multiple sell service
const CreateSellService = async (payloads: any) => {
  const { data, ids } = payloads
  // Generate unique IDs for each sell
  const uniqueSellIds = await Promise.all(
    data.map(async () => await generateUniqueSellId('sel')),
  )

  // Initialize an array to hold the results of the creation operation
  const createdSells: Sells[] = []

  // Use Prisma transaction for atomicity
  return prisma.$transaction(async tx => {
    // Loop through each payload
    for (let i = 0; i < data.length; i++) {
      const payload = data[i]
      const sellId = uniqueSellIds[i]
      payload.uniqueId = sellId

      const variantId = payload.variantId

      // console.log(payload)

      // Check if the variant exists
      const isVariantExist = await tx.variants.findUnique({
        where: { id: variantId },
      })

      if (!isVariantExist) {
        throw new Error('Product does not exist')
      }

      // Create sell variant
      const sellVariantsInfo = {
        imeiNumber: isVariantExist.imeiNumber,
        ram: isVariantExist.ram,
        rom: isVariantExist.rom,
        color: isVariantExist.color,
        purchaseRate: isVariantExist.purchaseRate,
        sellingPrice: isVariantExist.sellingPrice,
        vats: isVariantExist.vats,
        discounts: isVariantExist.discounts,
      }

      const createSellVariant = await tx.sellVariants.create({
        data: sellVariantsInfo,
      })

      // Associate sell with sell variant
      payload.sellVariantId = createSellVariant.id

      // Create sell
      const productSell = await tx.sells.create({ data: payload })

      // Delete the variant
      if (productSell) {
        await tx.variants.delete({ where: { id: variantId } })
      }

      // Push the created sell to the result array
      createdSells.push(productSell)
    }

    //----------------PAYMENT CREATE--------------
    const customerPaymentId = await generateUniqueCustomerPaymentId('cpd')
    // Check if the purchase already exists
    const isPaymentExist = await tx.customerPayments.findFirst({
      where: {
        userId: ids.userId,
        customerId: ids.customerId,
      },
    })

    const totalPay = data.reduce(
      (accumulator: number, item: Sells) => accumulator + item.totalPay,
      0,
    )
    const totalSellPrice = data.reduce(
      (accumulator: number, item: Sells) => accumulator + item.totalSellPrice,
      0,
    )

    const totalDue = totalSellPrice - totalPay

    // Payment APIs data
    const paymentInfo = {
      totalPay,
      totalSellPrice,
      totalDue,
      uniqueId: customerPaymentId,
      customerId: ids.customerId,
      userId: ids.userId,
    }

    if (!isPaymentExist) {
      await tx.customerPayments.create({
        data: paymentInfo,
      })
    } else {
      await tx.customerPayments.update({
        where: { id: isPaymentExist.id },
        data: {
          totalPay: isPaymentExist.totalPay + totalPay,
          totalSellPrice: isPaymentExist.totalSellPrice + totalSellPrice,
          totalDue: isPaymentExist.totalDue + totalDue,
        },
      })
    }

    return createdSells
  })
}

// get all user
const GetAllSellService = async () => {
  const result = await prisma.sells.findMany({
    include: {
      customer: true,
      user: true,
      sellVariant: true,
    },
  })
  return result
}

export const SellService = {
  CreateSellService,
  GetAllSellService,
}
