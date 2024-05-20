import { Sells } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniqueSellId } from '../../../utilities/uniqueIdGenerator'

// Create multiple sell service
const CreateSellService = async (payloads: Sells[]) => {
  // Generate unique IDs for each sell
  const uniqueSellIds = await Promise.all(
    payloads.map(async () => await generateUniqueSellId('sel')),
  )

  // Initialize an array to hold the results of the creation operation
  const createdSells: Sells[] = []

  // Use Prisma transaction for atomicity
  return prisma.$transaction(async tx => {
    // Loop through each payload
    for (let i = 0; i < payloads.length; i++) {
      const payload = payloads[i]
      const sellId = uniqueSellIds[i]
      payload.uniqueId = sellId

      const variantId = payload.variantId

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

    return createdSells
  })
}

// // Create sell service
// const CreateSellService = async (payload: Sells) => {
//   const sellId = await generateUniqueSellId('sel')
//   payload.uniqueId = sellId

//   // @ts-ignore
//   const variantId = payload.variantId

//   return prisma.$transaction(async tx => {
//     const isVariantExist = await tx.variants.findUnique({
//       where: { id: variantId },
//     })

//     if (!isVariantExist) {
//       throw new Error('Product does not exist')
//     }

//     const sellVariantsInfo = {
//       imeiNumber: isVariantExist.imeiNumber,
//       ram: isVariantExist.ram,
//       rom: isVariantExist.rom,
//       color: isVariantExist.color,
//       purchaseRate: isVariantExist.purchaseRate,
//       sellingPrice: isVariantExist.sellingPrice,
//       vats: isVariantExist.vats,
//       discounts: isVariantExist.discounts,
//     }

//     const createSellVariant = await tx.sellVariants.create({
//       data: sellVariantsInfo,
//     })

//     payload.sellVariantId = createSellVariant.id
//     const productSell = await tx.sells.create({ data: payload })

//     if (productSell) {
//       await tx.variants.delete({ where: { id: variantId } })
//     }

//     return productSell
//   })
// }

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
