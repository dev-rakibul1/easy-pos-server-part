import { z } from 'zod'

const CreatePurchaseZodSchema = z.object({
  body: z.object({
    purchase: z.array(
      z.object({
        purchaseRate: z
          .number({ required_error: 'Purchase rate is required.' })
          .min(0, { message: 'Purchase rate must be a non-negative number' }),
        sellingPrice: z
          .number({ required_error: 'Selling price is required.' })
          .min(0, { message: 'Selling price must be a non-negative number' }),
        discounts: z
          .number()
          .min(0, { message: 'Discounts must be a non-negative number' })
          .optional(),
        vats: z
          .number()
          .min(0, { message: 'VATs must be a non-negative number' })
          .optional(),
        totalPrice: z
          .number({ required_error: 'Total price is required.' })
          .min(0, { message: 'Total price must be a non-negative number' })
          .optional(),
        productStock: z
          .number()
          .min(0, { message: 'Product stock must be a non-negative number' })
          .optional(),
        othersStock: z
          .number()
          .min(0, { message: 'Other stock must be a non-negative number' })
          .optional(),
        color: z.string().optional(),
        uniqueId: z.string().optional(),

        supplierId: z
          .string({ required_error: 'Supplier id is required.' })
          .uuid({ message: 'Invalid supplier id.' }),
        userId: z
          .string({ required_error: 'User id is required.' })
          .uuid({ message: 'Invalid user id.' }),
        productId: z
          .string({ required_error: 'Product id is required.' })
          .uuid({ message: 'Invalid product id.' }),

        additionalPurchaseId: z.string().uuid().optional(),
      }),
    ),
  }),
})

const UpdatePurchaseZodSchema = z.object({
  body: z.object({
    purchaseRate: z
      .number()
      .min(0, { message: 'Purchase rate must be a non-negative number' })
      .optional(),
    sellingPrice: z
      .number()
      .min(0, { message: 'Selling price must be a non-negative number' })
      .optional(),
    discounts: z
      .number()
      .min(0, { message: 'Discounts must be a non-negative number' })
      .optional(),
    vats: z
      .number()
      .min(0, { message: 'VATs must be a non-negative number' })
      .optional(),
    totalPrice: z
      .number()
      .min(0, { message: 'Total price must be a non-negative number' })
      .optional(),
    othersStock: z
      .number()
      .min(0, { message: 'Other stock must be a non-negative number' })
      .optional(),
    productStock: z
      .number()
      .min(0, { message: 'Product stock must be a non-negative number' })
      .optional(),
    color: z.string().optional(),
    uniqueId: z.string().optional(),
  }),
})

export const PurchaseZodSchema = {
  CreatePurchaseZodSchema,
  UpdatePurchaseZodSchema,
}

// ------------SUPPLIER PAYMENT INFORMATION------------
// const supplierPaymentId = await generateUniqueSupplierPaymentId('spd')

// // total price = 100

// const totalPrice1 = updatedPurchases.reduce(
//   (accumulator, item) => accumulator + item.totalPrice,
//   0,
// )
// const totalPrice2 = createdPurchases.reduce(
//   (accumulator, item) => accumulator + item.totalPrice,
//   0,
// )
// const subTotalPrice = totalPrice1 // 500
// const totalDueBalance =
//   parseFloat(subTotalPrice) - parseFloat(supplierPayment.totalPay)

// const createSubTotalPrice =
//   parseFloat(totalPrice2) - parseFloat(supplierPayment.totalPay)

// // Check if the purchase already exists
// const isExistingSupplierAndUser = await tx.supplierPayment.findFirst({
//   where: {
//     userId: supplierPayment.userId,
//     supplierId: supplierPayment.supplierId,
//   },
// })

// const supplierPaymentInfo = {
//   totalPay: supplierPayment.totalPay || 0,
//   totalDue: createSubTotalPrice,
//   totalSellPrice: subTotalPrice || 0,
//   supplierId: supplierPayment.supplierId,
//   userId: supplierPayment.userId,
//   uniqueId: supplierPaymentId,
// }

// // If the purchase exists, update it
// if (isExistingSupplierAndUser) {
//   await tx.supplierPayment.update({
//     where: { id: isExistingSupplierAndUser.id },
//     data: {
//       totalPay:
//         isExistingSupplierAndUser?.totalPay + supplierPayment.totalPay,
//       totalSellPrice:
//         isExistingSupplierAndUser?.totalSellPrice + subTotalPrice,
//       totalDue: isExistingSupplierAndUser?.totalDue + totalDueBalance,
//     },
//   })
// } else {
//   await tx.supplierPayment.create({
//     data: supplierPaymentInfo,
//   })
// }

// return { updatedPurchases, createdPurchases }
