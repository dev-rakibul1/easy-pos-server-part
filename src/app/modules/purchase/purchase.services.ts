import { Purchase } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { generateUniquePurchaseIds } from '../../../utilities/purchaseIdGen/purchaseIdGen'
import { generateUniqueSupplierPaymentId } from '../../../utilities/uniqueIdGenerator'

// Create user
const CreatePurchaseService = async (data: any) => {
  const { variants, purchase, supplierPayment } = data

  console.log('purchase', purchase)

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
            totalStock: purchaseItem.totalStock,
          },
        })

        updatedPurchases.push(updatedPurchase)
      } else {
        // Purchase does not exist, proceed with creation
        // Set unique IDs for the new purchase
        // const uniqueUpdateId = await generateUniquePurchaseIds('PUR', 1)
        // const newData = { ...purchaseItem, uniqueId: uniqueUpdateId[0] }

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

    // if(updatedPurchases){
    //   await tx.variants.createMany({ data: variants })
    //   const result = await tx.purchase.createMany({ data: newData })
    // }

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
    const subTotalPrice = totalPrice1 || 0 + totalPrice2 || 0

    // Check if the purchase already exists
    const isExistingSupplierAndUser = await tx.supplierPayment.findFirst({
      where: {
        userId: supplierPayment.userId,
        supplierId: supplierPayment.supplierId,
      },
    })

    // const test = await tx.supplierPayment.findFirst({
    //   where: {
    //     userId: supplierPayment.userId,
    //     supplierId: supplierPayment.supplierId,
    //   },
    // })

    // console.log('__________________', test)

    const supplierPaymentInfo = {
      totalPay: supplierPayment.totalPay || 0,
      totalSellPrice: subTotalPrice || 0,
      supplierId: supplierPayment.supplierId,
      userId: supplierPayment.userId,
      uniqueId: supplierPaymentId,
    }

    // If the purchase exists, update it
    if (isExistingSupplierAndUser) {
      await tx.supplierPayment.update({
        where: { id: isExistingSupplierAndUser.id },
        data: {
          totalPay: supplierPayment.totalPay,
          totalSellPrice: subTotalPrice,
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
