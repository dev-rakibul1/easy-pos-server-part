import { PurchaseGroup } from '@prisma/client'
import prisma from '../../../shared/prisma'

// get all purchase group
const GetAllPurchaseGroupService = async (): Promise<PurchaseGroup[]> => {
  const result = await prisma.purchaseGroup.findMany({
    include: {
      supplierSellProducts: {
        include: {
          variants: true,
          purchase: true,
        },
      },
      supplierSells: true,
      payInSupplier: true,
    },
  })
  return result
}
// get single group by supplier sells id
const SinglePurchaseGroupService = async (
  id: string,
): Promise<PurchaseGroup | null> => {
  const result = await prisma.purchaseGroup.findFirst({
    where: { supplierSells: { id: id } },
    include: {
      supplierSellProducts: {
        include: {
          variants: true,
          purchase: true,
        },
      },
      supplierSells: true,
      payInSupplier: true,
    },
  })
  return result
}

export const PurchaseGroupService = {
  GetAllPurchaseGroupService,
  SinglePurchaseGroupService,
}
