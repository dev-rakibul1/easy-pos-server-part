"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
// Create purchase
const CreatePurchaseService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseId = yield (0, uniqueIdGenerator_1.generateUniquePurchaseId)('pur');
    const invoiceId = yield (0, uniqueIdGenerator_1.generateUniqueInvoiceId)('Inv');
    const { variants, purchase, supplierPayment } = data;
    // Remove unnecessary fields from purchase
    purchase.forEach((pur) => {
        delete pur.productName;
        delete pur.brandName;
    });
    // Total product sell price
    const totalProductPrice = purchase.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // --------Purchase Group----------
        const purchaseGroupInformation = {
            supplierId: supplierPayment.supplierId,
            userId: supplierPayment.userId,
            uniqueId: invoiceId,
        };
        const purchaseGroup = yield tx.purchaseGroup.create({
            data: purchaseGroupInformation,
        });
        //------SUPPLIER SELLS---------
        // Generate supplier sell entries
        const supplierSellEntries = {
            quantity: variants.length,
            totalSellAmounts: totalProductPrice,
            totalDue: totalProductPrice - supplierPayment.totalPay,
            totalPay: supplierPayment.totalPay,
            supplierId: supplierPayment.supplierId,
            userId: supplierPayment.userId,
            productId: supplierPayment.productId,
            purchaseGroupId: purchaseGroup.id,
            paymentType: supplierPayment.paymentType,
        };
        // Create supplier sells
        const createdSupplierSells = yield tx.supplierSell.create({
            data: supplierSellEntries,
        });
        // -----------Supplier sell product----------
        const ids = purchase.map((purchase) => purchase.productId);
        // Fetch data for each id
        const dataPromises = ids.map(id => tx.product.findUnique({ where: { id } }));
        const products = yield Promise.all(dataPromises);
        const userId = supplierPayment.userId;
        const purchaseGroupId = purchaseGroup.id;
        const supplierId = supplierPayment.supplierId;
        const newProducts = products.map(product => {
            // @ts-ignore
            const { uniqueId, id } = product, restProduct = __rest(product, ["uniqueId", "id"]);
            return Object.assign(Object.assign({}, restProduct), { userId,
                purchaseGroupId,
                supplierId, productId: id });
        });
        // Store the new products in the supplierSellProduct table and get the created objects
        const createdProductsPromises = newProducts.map(newProduct => tx.supplierSellProduct.create({ data: newProduct }));
        const createdSupplierSellProducts = yield Promise.all(createdProductsPromises);
        const createdPurchaseIds = createdSupplierSellProducts.map(id => id.id);
        // Fetch data for each id
        const purchases = purchase.map((purchase, index) => {
            const supplierSellProductId = createdPurchaseIds[index % createdPurchaseIds.length];
            return Object.assign(Object.assign({}, purchase), { supplierSellProductId, uniqueId: purchaseId, supplierSellId: createdSupplierSells.id });
        });
        // Extract the created purchase IDs and map them to product IDs
        const productIdToPurchaseIdMap = {};
        createdSupplierSellProducts.forEach((product, index) => {
            productIdToPurchaseIdMap[newProducts[index].productId] = product.id;
        });
        // Supplier sell variants create
        const isMatchWithProduct = variants
            .filter(va => productIdToPurchaseIdMap.hasOwnProperty(va.productId))
            .map(va => {
            const supplierSellProductId = productIdToPurchaseIdMap[va.productId];
            const { productId } = va, rest = __rest(va, ["productId"]);
            return Object.assign(Object.assign({}, rest), { supplierSellProductId });
        });
        // Create the variants in the supplierSellVariants table
        yield tx.supplierSellVariants.createMany({
            data: isMatchWithProduct,
        });
        // --------PURCHASE & VARIANTS--------
        // Create purchases
        // Create purchases individually and store the created records
        const createdPurchases = yield Promise.all(purchases.map(purchase => tx.purchase.create({ data: purchase })));
        // Match purchases with variants
        createdPurchases.filter(pur => {
            const matchingVariant = variants.find(va => va.productId === pur.productId);
            return matchingVariant !== undefined;
        });
        // Map new variants info
        const newVariantsInfo = variants.map(variant => {
            const matchingPurchase = createdPurchases.find(purchase => purchase.productId === variant.productId);
            if (matchingPurchase) {
                return Object.assign(Object.assign({}, variant), { purchaseId: matchingPurchase.id });
            }
            return variant;
        });
        yield tx.variants.createMany({
            data: newVariantsInfo,
        });
        // await tx.variants.createMany({
        //   data: variants,
        // })
        // const result = await tx.purchase.createMany({ data: purchases })
        return createdPurchases;
    }));
});
// Create purchase
// const CreatePurchaseService = async (data: IPurchaseType) => {
//   const { variants, purchase, supplierPayment } = data
//   // console.log(data)
//   // Remove unnecessary fields from purchase
//   purchase.forEach((pur: any) => {
//     delete pur.productName
//     delete pur.brandName
//   })
//   const updatedPurchases: Purchase[] = []
//   const createdPurchases: Purchase[] = []
//   // const supplierSells: any[] = []
//   const totalProductPrice = purchase.reduce(
//     (accumulator: number, item: Purchase) => accumulator + item.totalPrice,
//     0,
//   )
//   return await tx.$transaction(async tx => {
//     // -------------------Purchase Group-------------------
//     const purchaseGroupInformation = {
//       supplierId: supplierPayment.supplierId,
//       userId: supplierPayment.userId,
//     }
//     const purchaseGroup = await tx.purchaseGroup.create({
//       data: purchaseGroupInformation,
//     })
//     //------------------SUPPLIER SELLS------------------
//     // Generate supplier sell entries
//     const supplierSellEntries = {
//       quantity: variants.length,
//       totalSellAmounts: totalProductPrice,
//       totalDue: totalProductPrice - supplierPayment.totalPay,
//       totalPay: supplierPayment.totalPay,
//       supplierId: supplierPayment.supplierId,
//       userId: supplierPayment.userId,
//       productId: supplierPayment.productId,
//       purchaseGroupId: purchaseGroup.id,
//     }
//     // supplierSells.push(supplierSellEntries)
//     // console.log(supplierSellEntries)
//     // Create supplier sells
//     const createdSupplierSells = await tx.supplierSell.create({
//       data: supplierSellEntries,
//     })
//     // -----------Supplier sell product----------
//     const getProduct = await tx.product.findFirst({
//       where: { id: supplierPayment.productId },
//     })
//     if (!getProduct) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Invalid product.')
//     }
//     // Ensure all required fields are present and have correct types
//     const supplierSellProduct = {
//       productName: getProduct.productName,
//       brandName: getProduct.brandName,
//       modelName: getProduct.modelName,
//       processor: getProduct.processor,
//       supplierId: supplierPayment.supplierId,
//       unit: getProduct.unit,
//       category: getProduct.category,
//       reOrderAlert: 0,
//       productImage: '',
//       description: '',
//       productStock: getProduct.productStock || 0,
//       othersStock: getProduct.othersStock || 0,
//       userId: supplierPayment.userId,
//       purchaseGroupId: purchaseGroup.id,
//     }
//     const getSupplierSellProductId = await tx.supplierSellProduct.create({
//       data: supplierSellProduct,
//     })
//     const isMatchWithProduct = variants
//       .filter(va => va.productId === supplierPayment.productId)
//       .map(va => {
//         const { productId, ...rest } = va // Destructure to remove productId
//         return {
//           ...rest,
//           supplierSellProductId: getSupplierSellProductId.id,
//         }
//       })
//     // console.log('supplierSellProduct_________', isMatchWithProduct)
//     // console.log(createdSupplierSells)
//     // Check if supplier sells were created successfully
//     if (createdSupplierSells) {
//       if (variants.length) {
//         // Create supplier sell variants
//         await tx.supplierSellVariants.createMany({
//           data: isMatchWithProduct,
//         })
//       }
//     }
//     //------------------PURCHASE & VARIANTS------------------
//     for (const purchaseItem of purchase) {
//       const existingPurchase = await tx.purchase.findFirst({
//         where: {
//           userId: purchaseItem.userId,
//           productId: purchaseItem.productId,
//           supplierId: purchaseItem.supplierId,
//         },
//       })
//       console.log('getSupplierSellProductId', getSupplierSellProductId)
//       if (existingPurchase) {
//         if (variants.length) {
//           await tx.variants.createMany({ data: variants })
//           const updatedPurchase = await tx.purchase.update({
//             where: { id: existingPurchase.id },
//             data: {
//               sellingPrice: purchaseItem.sellingPrice,
//               purchaseRate: purchaseItem.purchaseRate,
//               vats: purchaseItem.vats,
//               discounts: purchaseItem.discounts,
//               color: purchaseItem.color,
//               totalPrice: purchaseItem.totalPrice,
//               othersStock: purchaseItem.othersStock,
//               productStock: purchaseItem.productStock,
//               ram: purchaseItem.ram,
//               room: purchaseItem.room,
//             },
//           })
//           updatedPurchases.push(updatedPurchase)
//         }
//       } else {
//         const uniqueUpdateId = await generateUniquePurchaseIds(
//           'PUR',
//           purchase.length,
//         )
//         const newData = purchase.map((item: any, index: number) => ({
//           ...item,
//           uniqueId: uniqueUpdateId[index],
//           supplierSellId: createdSupplierSells.id,
//           supplierSellProductId: getSupplierSellProductId.id,
//         }))
//         // -------------------------------
//         const isExistProduct = await tx.product.findMany({})
//         variants.map(async variant => {
//           const matchingProduct = isExistProduct.find(
//             product => product.id === variant.productId,
//           )
//           if (matchingProduct) {
//             const createdVariant = await tx.variants.create({
//               data: {
//                 imeiNumber: variant.imeiNumber,
//                 ram: variant.ram,
//                 rom: variant.rom,
//                 color: variant.color,
//                 product: { connect: { id: matchingProduct.id } },
//               },
//             })
//             // console.log(createdVariant)
//             return createdVariant
//           }
//         })
//         // -------------------------------
//         // CRETE VARIANTS
//         await tx.variants.createMany({ data: variants })
//         // CREATE PURCHASE
//         await tx.purchase.createMany({
//           data: newData,
//         })
//         createdPurchases.push(...newData)
//       }
//     }
//     // -------------------Supplier payments-------------------
//     const totalPrice1 = createdPurchases.reduce(
//       (accumulator: number, item: Purchase) => accumulator + item.totalPrice,
//       0,
//     )
//     // const subTotalPrice = totalPrice1
//     const totalDueBalance =
//       // @ts-ignore
//       parseFloat(totalPrice1) - parseFloat(supplierPayment.totalPay)
//     const supplierPaymentId = await generateUniqueSupplierPaymentId('spd')
//     // Supplier payment payloads or information
//     const supplierPaymentInfo = {
//       totalPay: supplierPayment.totalPay || 0,
//       totalSellPrice: totalPrice1 || 0,
//       totalDue: totalDueBalance,
//       supplierId: supplierPayment.supplierId,
//       userId: supplierPayment.userId,
//       uniqueId: supplierPaymentId,
//     }
//     // Is data between supplier payment is exist so that we are searching payment
//     const isExistingSupplierAndUser = await tx.supplierPayment.findFirst({
//       where: {
//         userId: supplierPayment.userId,
//         supplierId: supplierPayment.supplierId,
//       },
//     })
//     // Supplier payment create APIs
//     if (isExistingSupplierAndUser) {
//       await tx.supplierPayment.update({
//         where: { id: isExistingSupplierAndUser.id },
//         data: {
//           totalPay:
//             isExistingSupplierAndUser.totalPay + supplierPayment.totalPay,
//           totalSellPrice:
//             isExistingSupplierAndUser.totalSellPrice + totalPrice1,
//           totalDue: isExistingSupplierAndUser.totalDue + totalDueBalance,
//         },
//       })
//     } else {
//       await tx.supplierPayment.create({
//         data: supplierPaymentInfo,
//       })
//     }
//     return {
//       updatedPurchases,
//       createdPurchases,
//       // supplierSells,
//     }
//   })
// }
// get all purchase
const GetAllCreatePurchaseService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['color', 'uniqueId'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // Filters
    if (Object.keys(filterData).length) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    // Pagination
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    // Where condition
    const whereConditions = andConditions.length
        ? { AND: andConditions }
        : {};
    const result = yield prisma_1.default.purchase.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: 'desc' },
        include: {
            products: true,
            suppliers: true,
            users: true,
            supplierSellProduct: true,
            supplierSells: true,
        },
    });
    const total = yield prisma_1.default.purchase.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
const GetAllPurchaseByCurrentDateService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = yield prisma_1.default.purchase.findMany({
        where: {
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        orderBy: { createdAt: 'desc' },
        include: {
            products: true,
            suppliers: true,
            users: true,
            supplierSellProduct: true,
            supplierSells: true,
        },
    });
    return result;
});
const GetAllPurchaseByCurrentWeekService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Date 7 days ago
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    // Ensure we do not go before the start of the month
    const startDate = sevenDaysAgo < startOfMonth ? startOfMonth : sevenDaysAgo;
    const result = yield prisma_1.default.purchase.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lt: today,
            },
        },
        orderBy: { createdAt: 'desc' },
        include: {
            products: true,
            suppliers: true,
            users: true,
            supplierSellProduct: true,
            supplierSells: true,
        },
    });
    return result;
});
// get all purchase depended by current month
const GetAllPurchaseByCurrentMonthService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get the start of the next month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const result = yield prisma_1.default.purchase.findMany({
        where: {
            createdAt: {
                gte: startOfMonth,
                lt: endOfMonth,
            },
        },
        orderBy: { createdAt: 'desc' },
        include: {
            products: true,
            suppliers: true,
            users: true,
            supplierSellProduct: true,
            supplierSells: true,
        },
    });
    return result;
});
// get all purchase depended by current month
const GetAllPurchaseByCurrentYearService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date one year ago
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const result = yield prisma_1.default.purchase.findMany({
        where: {
            createdAt: {
                gte: oneYearAgo,
                lt: today,
            },
        },
        orderBy: { createdAt: 'desc' },
        include: {
            products: true,
            suppliers: true,
            users: true,
            supplierSellProduct: true,
            supplierSells: true,
        },
    });
    return result;
});
// Purchase updated
const UpdateCreatePurchaseService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const isExist = yield tx.purchase.findUnique({ where: { id: id } });
            if (!isExist) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid purchase.');
            }
            const result = yield tx.purchase.update({
                where: { id: id },
                data: payloads,
            });
            // console.log(result)
            const searchSupplierPayment = yield tx.supplierPayment.findFirst({
                where: { userId: result.userId, supplierId: result.supplierId },
            });
            if (!searchSupplierPayment) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Supplier payment not found.');
            }
            const previousAmount = isExist.totalPrice;
            const currentPrice = searchSupplierPayment.totalSellPrice -
                previousAmount +
                result.sellingPrice;
            yield tx.supplierPayment.update({
                where: { id: searchSupplierPayment.id },
                data: { totalSellPrice: currentPrice },
            });
            return result;
        }));
    }
    catch (error) {
        console.error('Error in UpdateCreatePurchaseService:', error);
        throw error; // Rethrow the error for the caller to handle
    }
});
// Supplier And User Trans
const GetBuySupplierAndUserPurchaseService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = ids;
        const [supplierId, userId] = obj.id.split(',');
        const result = yield prisma_1.default.purchase.findMany({
            where: { supplierId: supplierId, userId: userId },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
//Single purchase get
const GetSinglePurchaseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.purchase.findUnique({
        where: { id },
        include: {
            products: true,
            suppliers: true,
            users: true,
        },
    });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid purchase');
    }
    return result;
});
exports.PurchaseService = {
    CreatePurchaseService,
    GetAllCreatePurchaseService,
    UpdateCreatePurchaseService,
    GetBuySupplierAndUserPurchaseService,
    GetSinglePurchaseService,
    GetAllPurchaseByCurrentDateService,
    GetAllPurchaseByCurrentWeekService,
    GetAllPurchaseByCurrentMonthService,
    GetAllPurchaseByCurrentYearService,
};
