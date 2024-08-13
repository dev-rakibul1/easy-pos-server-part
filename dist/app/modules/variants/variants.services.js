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
exports.VariantService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create user
const CreateVariantService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.variants.create({ data: payload });
    return result;
});
// get all user
const GetAllCreateVariantService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // SearchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['imeiNumber', 'ram', 'rom', 'color'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // Filter data
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
    const result = yield prisma_1.default.variants.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
        include: {
            product: true,
        },
    });
    const total = yield prisma_1.default.variants.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// get all user
const DeleteSingleVariantService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.variants.delete({ where: { id: id } });
    return result;
});
// get all user
const GetSingleSingleVariantService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.variants.findFirst({ where: { id: id } });
    if (!result)
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid variants');
    return result;
});
// to check the last stock
const LastStockCountService = () => __awaiter(void 0, void 0, void 0, function* () {
    // ----------------LAST STOCK IN--------------
    const variants = yield prisma_1.default.variants.findMany({});
    const ids = [];
    // Push purchaseId into ids array
    variants === null || variants === void 0 ? void 0 : variants.forEach((variant) => {
        ids.push(variant.purchaseId);
    });
    // Fetch stock data for each purchaseId
    const lastStock = yield Promise.all(ids.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield prisma_1.default.variants.findMany({
            where: { purchaseId: id },
            select: {
                id: true,
                purchaseId: true,
            },
        });
        return data;
    })));
    // Map the lastStock to count occurrences of each purchaseId
    const result = lastStock.map(st => ({
        id: st[0].purchaseId,
        count: st.length,
    }));
    // Remove duplicates by purchaseId and get the unique counts
    const variantStockData = Array.from(new Map(result.map(item => [item.id, item])).values());
    const count = variantStockData.reduce((acc, item) => acc + (item === null || item === void 0 ? void 0 : item.count), 0);
    // ----------------CALCULATION WITH STOCK--------------
    const purchase = yield prisma_1.default.purchase.findMany({});
    const isMatchWithVariant = variantStockData === null || variantStockData === void 0 ? void 0 : variantStockData.map(stock => {
        const matchId = purchase.filter(pur => pur.id === stock.id);
        return matchId.map(item => {
            // @ts-ignore
            const purchaseRate = (item === null || item === void 0 ? void 0 : item.totalPrice) / (item === null || item === void 0 ? void 0 : item.productStock) || 0;
            console.log(purchaseRate);
            return {
                productId: item === null || item === void 0 ? void 0 : item.productId,
                uniqueId: item === null || item === void 0 ? void 0 : item.uniqueId,
                purchaseRateWithOutVatDiscount: item === null || item === void 0 ? void 0 : item.purchaseRate,
                vats: item === null || item === void 0 ? void 0 : item.vats,
                discounts: item === null || item === void 0 ? void 0 : item.discounts,
                purchaseRate: purchaseRate,
                totalStockPrice: purchaseRate * stock.count,
                sellingPrice: (item === null || item === void 0 ? void 0 : item.sellingPrice) * stock.count,
                totalPrice: item.totalPrice,
                purchaseId: item === null || item === void 0 ? void 0 : item.id,
                quantity: stock === null || stock === void 0 ? void 0 : stock.count,
            };
        });
    });
    // Remove duplicates by purchaseId and get the unique counts
    const data = isMatchWithVariant.flatMap(data => data);
    return { data, count };
});
exports.VariantService = {
    CreateVariantService,
    GetAllCreateVariantService,
    DeleteSingleVariantService,
    GetSingleSingleVariantService,
    LastStockCountService,
};
