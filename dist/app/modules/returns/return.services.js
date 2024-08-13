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
exports.ReturnService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
const CreateReturnService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const returnId = yield (0, uniqueIdGenerator_1.generateUniqueReturnId)('r');
    const returnInvoiceId = yield (0, uniqueIdGenerator_1.generateUniqueReturnGroupId)('RIn');
    const { variants: clientVariants, payloads, supplierReturn } = data;
    // Total product sell price
    const totalReturnAmount = payloads.reduce((accumulator, item) => accumulator + Number(item.totalSellPrice), 0);
    // @ts-ignore
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // --------Purchase Group----------
        const returnGroupInformation = {
            supplierId: supplierReturn.supplierId,
            userId: supplierReturn.userId,
            uniqueId: returnInvoiceId,
        };
        const returnGroup = yield tx.returnGroups.create({
            data: returnGroupInformation,
        });
        //------SUPPLIER SELLS---------
        // Generate supplier sell entries
        const returnAmountEntries = {
            quantity: clientVariants.length,
            totalReturnAmount: totalReturnAmount,
            totalDue: totalReturnAmount - supplierReturn.totalPay,
            totalPay: supplierReturn.totalPay,
            supplierId: supplierReturn.supplierId,
            userId: supplierReturn.userId,
            productId: supplierReturn.productId,
            returnGroupId: returnGroup.id,
            paymentType: supplierReturn.paymentType,
        };
        // Create supplier sells
        yield tx.supplierReturnPayments.create({
            data: returnAmountEntries,
        });
        // -----------Supplier sell product----------
        const ids = payloads.map(id => id.productId);
        // Fetch data for each id
        const dataPromises = ids.map(id => tx.product.findUnique({ where: { id } }));
        const products = yield Promise.all(dataPromises);
        const userId = supplierReturn.userId;
        const returnGroupId = returnGroup.id;
        const supplierId = returnGroup.supplierId;
        const newProducts = products.map(product => {
            // @ts-ignore
            const { uniqueId, id } = product, restProduct = __rest(product, ["uniqueId", "id"]);
            return Object.assign(Object.assign({}, restProduct), { userId,
                returnGroupId,
                supplierId, productId: id });
        });
        // Store the new products in the supplierSellProduct table and get the created objects
        const createdProductsPromises = newProducts.map(newProduct => tx.userReturnProducts.create({ data: newProduct }));
        const createdSupplierSellProducts = yield Promise.all(createdProductsPromises);
        const createdReturnIds = createdSupplierSellProducts.map(id => id.id);
        // --------------RETURN INFO-------------
        // Customer purchase product information or data
        const variantIds = clientVariants.map(id => id.variantId);
        const existVariantSearching = yield Promise.all(variantIds.map(id => tx.variants.findFirst({ where: { id } })));
        const isExistingVariants = existVariantSearching.filter(Boolean);
        if (isExistingVariants.length === 0) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Invalid variant-1`);
        }
        const variantsInfo = isExistingVariants.map((variant, index) => {
            // @ts-ignore
            const { createdAt, updatedAt, status, id } = variant, restProduct = __rest(variant, ["createdAt", "updatedAt", "status", "id"]);
            return Object.assign(Object.assign({}, restProduct), { uniqueId: `${String(returnId + index).padStart(6, '0')}` });
        });
        // Check supplier, user & product
        const supplierCheck = clientVariants.map((ret, index) => {
            const userReturnProductsId = createdReturnIds[index % createdReturnIds.length];
            return Object.assign(Object.assign({}, variantsInfo[index]), { supplierId: ret.supplierId, userId: ret.userId, 
                // productId: ret.productId,
                variantId: ret.variantId, userReturnProductsId });
        });
        // Extract the created purchase IDs and map them to product IDs
        const productIdToPurchaseIdMap = {};
        createdSupplierSellProducts.forEach((product, index) => {
            productIdToPurchaseIdMap[newProducts[index].productId] = product.id;
        });
        // Supplier sell variants create
        clientVariants
            .filter(va => productIdToPurchaseIdMap.hasOwnProperty(va.productId))
            .map(va => {
            const userReturnProductsId = productIdToPurchaseIdMap[va.productId];
            const { productId } = va, rest = __rest(va, ["productId"]);
            return Object.assign(Object.assign({}, rest), { userReturnProductsId });
        });
        // Update return data
        const updateReturnData = supplierCheck.map((obj, index) => {
            const returnObj = payloads[index % payloads.length];
            return Object.assign(Object.assign({}, obj), { price: parseFloat(returnObj === null || returnObj === void 0 ? void 0 : returnObj.totalSellPrice) });
        });
        const createdReturnPromises = updateReturnData.map(ret => {
            const { purchaseId } = ret, rest = __rest(ret
            // @ts-ignore
            , ["purchaseId"]);
            // @ts-ignore
            ret.price = parseFloat(ret.price);
            // @ts-ignore
            return tx.returns.create({ data: rest });
        });
        const createdReturns = yield Promise.all(createdReturnPromises);
        const returnIds = createdReturns.map(ret => ret.variantId);
        const stockOutVariant = returnIds.map(id => tx.variants.delete({ where: { id } }));
        yield Promise.all(stockOutVariant);
        // console.log('createdReturnPromises', getStockOutVariants)
        // console.log('createdReturns', createdReturns)
        return createdReturns;
    }));
});
// get all user
const GetAllReturnService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.returns.findMany({
        include: {
            supplier: true,
        },
    });
    return result;
});
// get all user
const GetAllReturnByCurrentDateService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = yield prisma_1.default.returns.findMany({
        include: {
            supplier: true,
        },
        where: {
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    return result;
});
// get all return depended current week
const GetAllReturnByCurrentWeekService = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.returns.findMany({
        include: {
            supplier: true,
        },
        where: {
            createdAt: {
                gte: startDate,
                lt: today,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
// get all return depended current month
const GetAllReturnByCurrentMonthService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get the start of the next month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const result = yield prisma_1.default.returns.findMany({
        include: {
            supplier: true,
        },
        where: {
            createdAt: {
                gte: startOfMonth,
                lt: endOfMonth,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
// get all return depended current month
const GetAllReturnByCurrentYearService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date one year ago
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const result = yield prisma_1.default.returns.findMany({
        include: {
            supplier: true,
        },
        where: {
            createdAt: {
                gte: oneYearAgo,
                lt: today,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
exports.ReturnService = {
    CreateReturnService,
    GetAllReturnService,
    GetAllReturnByCurrentDateService,
    GetAllReturnByCurrentWeekService,
    GetAllReturnByCurrentMonthService,
    GetAllReturnByCurrentYearService,
};
