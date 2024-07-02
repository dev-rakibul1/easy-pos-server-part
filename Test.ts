// const createdCustomerPurchaseProducts = await Promise.all(
//   createdProductsPromises,
// )

//  const returnProduct = await tx.returns.create({ data: variantsInfo })
// if (returnProduct) {
//   await tx.variants.delete({ where: { id: variantId } })
// }

// const isProductExist = await tx.variants.findUnique({
//   where: { id: variantId },
// })

// if (!isProductExist) {
//   throw new ApiError(httpStatus.NOT_FOUND, 'Product does not exist.')
// }

// const { id, createdAt, updatedAt, status, ...restVariant } = isProductExist
// const returnProductInfo = {
//   ...restVariant,
// }

// console.log(returnProductInfo)

// const returnInfo = {
//   ...returnProductInfo,
//   productName: payloads.productName,
//   modelName: payloads.modelName,
//   uniqueId: returnId,
// }

// const supplierOwnProductCheck = await tx.purchase.findFirst({
//   where: {
//     supplierId: payloads.supplierId,
//     userId: payloads.userId,
//     productId: payloads.productId,
//   },
// })

// if (!supplierOwnProductCheck) {
//   throw new ApiError(
//     httpStatus.BAD_REQUEST,
//     'This product does not belong to the specified supplier.',
//   )
// }

// const returnProduct = await tx.returns.create({ data: returnInfo })
// if (returnProduct) {
//   await tx.variants.delete({ where: { id: variantId } })
// }

// const searchSupplierPayment = await tx.supplierPayment.findFirst({
//   where: {
//     supplierId: payloads.supplierId,
//     userId: payloads.userId,
//   },
// })

// if (!searchSupplierPayment) {
//   throw new ApiError(httpStatus.NOT_FOUND, 'Payment does not exist')
// }

// if (searchSupplierPayment.totalDue < isProductExist.purchaseRate) {
//   const paymentCalculate = async (prevDue: number, refund: number) => {
//     const change = prevDue - refund
//     if (prevDue < refund) {
//       await tx.supplierPayment.update({
//         where: { id: searchSupplierPayment.id },
//         data: {
//           totalDue: 0,
//           totalSellPrice:
//             searchSupplierPayment.totalSellPrice -
//             isProductExist.purchaseRate,
//         },
//       })
//     }

//     throw new ApiError(
//       httpStatus.CONFLICT,
//       `Please refund ${change} balance in the seller.`,
//     )
//   }
// } else {
//   const pevDueAmount =
//     searchSupplierPayment.totalDue - isProductExist.purchaseRate

//   console.log(isProductExist)

//   await tx.supplierPayment.update({
//     where: { id: searchSupplierPayment.id },
//     data: {
//       totalDue: pevDueAmount,
//       totalSellPrice:
//         searchSupplierPayment.totalSellPrice - isProductExist.purchaseRate,
//     },
//   })
// }

// return returnProduct
