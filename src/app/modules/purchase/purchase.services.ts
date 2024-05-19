import { Purchase } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniquePurchaseIds } from '../../../utilities/purchaseIdGen/purchaseIdGen'

// Create user
const CreatePurchaseService = async (data: any) => {
  const { variants, purchase } = data
  const uniqueUpdateId = await generateUniquePurchaseIds('PUR', purchase.length)

  const newData = purchase.map((item: Purchase, index: number) => {
    return { ...item, uniqueId: uniqueUpdateId[index] }
  })

  return await prisma.$transaction(async tx => {
    await tx.variants.createMany({ data: variants })
    const result = await tx.purchase.createMany({ data: newData })
    return result
  })
}

// get all user
const GetAllCreatePurchaseService = async () => {
  const result = await prisma.purchase.findMany({
    include: {
      products: true,
      suppliers: true,
      users: true,
    },
  })
  return result
}

export const PurchaseService = {
  CreatePurchaseService,
  GetAllCreatePurchaseService,
}
