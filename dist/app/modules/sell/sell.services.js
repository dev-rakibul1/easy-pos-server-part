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
exports.SellService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const mailSend_1 = require("../../../helpers/mailSend");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
const sell_constant_1 = require("./sell.constant");
// Create multiple sell service
const CreateSellService = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const sellGroupInvoiceId = yield (0, uniqueIdGenerator_1.generateUniqueInvoiceGroupId)('SIN');
    const sellId = yield (0, uniqueIdGenerator_1.generateUniqueSellId)('Sel');
    const { variants, sells, customerPayInUser } = payloads;
    sells === null || sells === void 0 ? void 0 : sells.forEach((pur) => {
        if ((pur === null || pur === void 0 ? void 0 : pur.purchaseRate) !== undefined) {
            // @ts-ignore
            pur.purchaseRate = Number(parseFloat(pur.purchaseRate).toFixed(2));
        }
    });
    // Total product sell price
    const totalProductPrice = sells === null || sells === void 0 ? void 0 : sells.reduce((accumulator, item) => accumulator + (item === null || item === void 0 ? void 0 : item.totalSellPrice), 0);
    // -------------------Sells Group-------------------
    const sellGroupInformation = {
        customerId: customerPayInUser === null || customerPayInUser === void 0 ? void 0 : customerPayInUser.customerId,
        userId: customerPayInUser === null || customerPayInUser === void 0 ? void 0 : customerPayInUser.userId,
        uniqueId: sellGroupInvoiceId,
    };
    const sellGroup = yield prisma_1.default.sellGroups.create({
        data: sellGroupInformation,
    });
    //------------------USER SELLS------------------
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Generate user sell entries
        const userSellEntries = {
            quantity: variants.length,
            totalPurchaseAmounts: totalProductPrice,
            totalDue: totalProductPrice - customerPayInUser.totalPay,
            totalPay: customerPayInUser.totalPay,
            customerId: customerPayInUser.customerId,
            userId: customerPayInUser.userId,
            paymentType: customerPayInUser.paymentType,
            sellGroupId: sellGroup.id,
        };
        // Create customer purchase
        yield tx.customerPurchase.create({
            data: userSellEntries,
        });
        // -----------Customer purchase product----------
        const ids = sells.map((sell) => sell.productId);
        // Fetch data for each id
        const dataPromises = ids.map(id => tx.product.findUnique({ where: { id } }));
        const products = yield Promise.all(dataPromises);
        const userId = customerPayInUser.userId;
        const sellGroupId = sellGroup.id;
        const customerId = customerPayInUser.customerId;
        // customer purchase product information or data
        const newProducts = products.map(product => {
            // @ts-ignore
            const { uniqueId, id } = product, restProduct = __rest(product, ["uniqueId", "id"]);
            return Object.assign(Object.assign({}, restProduct), { userId,
                sellGroupId,
                customerId, productId: id });
        });
        // Store the new products in the createdCustomerPurchaseProducts table and get the created objects
        const createdProductsPromises = newProducts.map(newProduct => tx.customerPurchaseProducts.create({ data: newProduct }));
        const createdCustomerPurchaseProducts = yield Promise.all(createdProductsPromises);
        const createdSellsIds = createdCustomerPurchaseProducts.map(id => id.id);
        // Extract the created purchase IDs and map them to product IDs
        const productIdToSellsIdMap = {};
        createdCustomerPurchaseProducts.forEach((product, index) => {
            productIdToSellsIdMap[newProducts[index].productId] = product.id;
        });
        // Supplier sell variants create
        const isMatchWithProduct = variants
            .filter(va => productIdToSellsIdMap.hasOwnProperty(va.productId))
            .map(va => {
            const customerPurchaseProductId = productIdToSellsIdMap[va.productId];
            const { productId } = va, rest = __rest(va, ["productId"]);
            return Object.assign(Object.assign({}, rest), { customerPurchaseProductId });
        });
        isMatchWithProduct === null || isMatchWithProduct === void 0 ? void 0 : isMatchWithProduct.map(ve => {
            // @ts-ignore
            delete ve.variantId;
        });
        // Extract variantIds from variants array
        const variantIdsList = variants.map(variant => variant.variantId);
        // Check if each variantId exists
        const isExistVariant = yield Promise.all(variantIdsList.map(id => tx.variants.findFirst({
            where: { id },
        })));
        // Check if all variants exist
        if (isExistVariant.some(variant => !variant)) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'One or more variants are invalid');
        }
        // Create the variants in the customerPurchaseVariants table
        const createCustomerPurchaseVariants = yield Promise.all(isMatchWithProduct.map(data => tx.customerPurchaseVariants.create({ data })));
        const createdVariantIds = createCustomerPurchaseVariants === null || createCustomerPurchaseVariants === void 0 ? void 0 : createCustomerPurchaseVariants.map(id => id.id);
        // Fetch data for each id
        const sales = sells.map((sell, index) => {
            const customerPurchaseProductId = createdSellsIds[index % createdSellsIds.length];
            const customerPurchaseVariantId = createdVariantIds[index % createdVariantIds.length];
            return Object.assign(Object.assign({}, sell), { uniqueId: sellId, customerPurchaseProductId,
                customerPurchaseVariantId });
        });
        // -------------SELL & VARIANTS------------
        sales.map(del => {
            // @ts-ignore
            del === null || del === void 0 ? true : delete del.customerName;
        });
        const createdSales = yield tx.sells.createMany({ data: sales });
        // const createPromises = sales.map((sale: Sells) =>
        //   tx.sells.create({
        //     data: sale,
        //   }),
        // )
        // const createdSales = await Promise.all(createPromises)
        // console.log('Sells create____', createdSales)
        const salesInfo = yield tx.sellGroups.findFirst({
            where: { id: sellGroup.id },
            include: {
                customerPurchaseProducts: {
                    include: {
                        variants: true,
                        sell: true,
                    },
                },
                customerPurchase: {
                    include: {
                        customer: true,
                    },
                },
                customerPayInUser: true,
            },
        });
        if (createdSales) {
            yield tx.variants.deleteMany({
                where: {
                    id: { in: variantIdsList },
                },
            });
        }
        // console.log('sales info', salesInfo)
        if (createdSales) {
            (0, mailSend_1.mailSend)(salesInfo);
        }
        return createdSales;
    }));
});
// get all user
const GetAllSellService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: sell_constant_1.sellFilterablePartialSearch.map(field => ({
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
    const result = yield prisma_1.default.sells.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
        include: {
            customer: true,
            user: true,
        },
    });
    const total = yield prisma_1.default.sells.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
const GetAllSellByCurrentDateService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = yield prisma_1.default.sells.findMany({
        where: {
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
            user: true,
        },
    });
    return result;
});
const GetAllSellByCurrentWeekService = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.sells.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lt: today,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
            user: true,
        },
    });
    return result;
});
// Get all sells by current month
const GetAllSellByCurrentMonthService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get the start of the next month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const result = yield prisma_1.default.sells.findMany({
        where: {
            createdAt: {
                gte: startOfMonth,
                lt: endOfMonth,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
            user: true,
        },
    });
    return result;
});
// Get all sells by current years
const GetAllSellByCurrentYearService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date one year ago
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const result = yield prisma_1.default.sells.findMany({
        where: {
            createdAt: {
                gte: oneYearAgo,
                lt: today,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
            user: true,
        },
    });
    return result;
});
const SellGetByCustomerPurchaseIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.sells.findFirst({
        where: {
            customerPurchaseProductId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
            user: true,
        },
    });
    return result;
});
// get single sell
const GetSingleSellService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.sells.findFirst({
        where: {
            customerPurchaseProductId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
            user: true,
        },
    });
    return result;
});
exports.SellService = {
    CreateSellService,
    GetAllSellService,
    GetAllSellByCurrentDateService,
    GetAllSellByCurrentWeekService,
    GetAllSellByCurrentMonthService,
    GetAllSellByCurrentYearService,
    SellGetByCustomerPurchaseIdService,
    GetSingleSellService,
};
