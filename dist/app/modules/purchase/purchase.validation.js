"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseZodSchema = void 0;
const zod_1 = require("zod");
const CreatePurchaseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        purchase: zod_1.z.array(zod_1.z.object({
            purchaseRate: zod_1.z
                .number({ required_error: 'Purchase rate is required.' })
                .min(0, { message: 'Purchase rate must be a non-negative number' }),
            sellingPrice: zod_1.z
                .number({ required_error: 'Selling price is required.' })
                .min(0, { message: 'Selling price must be a non-negative number' }),
            discounts: zod_1.z
                .number()
                .min(0, { message: 'Discounts must be a non-negative number' })
                .optional(),
            vats: zod_1.z
                .number()
                .min(0, { message: 'VATs must be a non-negative number' })
                .optional(),
            totalPrice: zod_1.z
                .number({ required_error: 'Total price is required.' })
                .min(0, { message: 'Total price must be a non-negative number' })
                .optional(),
            productStock: zod_1.z
                .number()
                .min(0, { message: 'Product stock must be a non-negative number' })
                .optional(),
            othersStock: zod_1.z
                .number()
                .min(0, { message: 'Other stock must be a non-negative number' })
                .optional(),
            color: zod_1.z.string().optional(),
            uniqueId: zod_1.z.string().optional(),
            supplierId: zod_1.z
                .string({ required_error: 'Supplier id is required.' })
                .uuid({ message: 'Invalid supplier id.' }),
            userId: zod_1.z
                .string({ required_error: 'User id is required.' })
                .uuid({ message: 'Invalid user id.' }),
            productId: zod_1.z
                .string({ required_error: 'Product id is required.' })
                .uuid({ message: 'Invalid product id.' }),
            additionalPurchaseId: zod_1.z.string().uuid().optional(),
        })),
    }),
});
const UpdatePurchaseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        purchaseRate: zod_1.z
            .number()
            .min(0, { message: 'Purchase rate must be a non-negative number' })
            .optional(),
        sellingPrice: zod_1.z
            .number()
            .min(0, { message: 'Selling price must be a non-negative number' })
            .optional(),
        discounts: zod_1.z
            .number()
            .min(0, { message: 'Discounts must be a non-negative number' })
            .optional(),
        vats: zod_1.z
            .number()
            .min(0, { message: 'VATs must be a non-negative number' })
            .optional(),
        totalPrice: zod_1.z
            .number()
            .min(0, { message: 'Total price must be a non-negative number' })
            .optional(),
        othersStock: zod_1.z
            .number()
            .min(0, { message: 'Other stock must be a non-negative number' })
            .optional(),
        productStock: zod_1.z
            .number()
            .min(0, { message: 'Product stock must be a non-negative number' })
            .optional(),
        color: zod_1.z.string().optional(),
        uniqueId: zod_1.z.string().optional(),
    }),
});
exports.PurchaseZodSchema = {
    CreatePurchaseZodSchema,
    UpdatePurchaseZodSchema,
};
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
