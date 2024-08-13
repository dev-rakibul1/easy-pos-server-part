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
exports.SellGroupService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// get all sell group
const GetAllSellGroupService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['uniqueId', 'userId', 'customerId'].map(field => ({
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
    const result = yield prisma_1.default.sellGroups.findMany({
        where: whereConditions,
        skip,
        take: limit,
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
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.sellGroups.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// get all sell group by current date
const GetSellGroupByCurrentDateService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['uniqueId', 'userId', 'customerId'].map(field => ({
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
    // Current date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    // Where condition including date range
    const whereConditions = {
        AND: [
            ...andConditions,
            {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        ],
    };
    const result = yield prisma_1.default.sellGroups.findMany({
        where: whereConditions,
        skip,
        take: limit,
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
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.sellGroups.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// get all sell group by current week
const GetSellGroupByCurrentWeekService = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.sellGroups.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lt: today,
            },
        },
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
        orderBy: { createdAt: 'desc' },
    });
    return result;
});
// get all sell group by current month
const GetSellGroupByCurrentMonthService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get the start of the next month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const result = yield prisma_1.default.sellGroups.findMany({
        where: {
            createdAt: {
                gte: startOfMonth,
                lt: endOfMonth,
            },
        },
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
        orderBy: { createdAt: 'desc' },
    });
    return result;
});
// get all sell group by current year
const GetSellGroupByCurrentYearService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date one year ago
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const result = yield prisma_1.default.sellGroups.findMany({
        where: {
            createdAt: {
                gte: oneYearAgo,
                lt: today,
            },
        },
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
        orderBy: { createdAt: 'desc' },
    });
    return result;
});
// get single group by customer sells id
const SingleSellGroupService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.sellGroups.findFirst({
        where: { customerPurchase: { id: id } },
        include: {
            customerPurchaseProducts: {
                include: {
                    variants: true,
                    sell: true,
                },
            },
            customerPurchase: true,
            customerPayInUser: true,
        },
    });
    return result;
});
// get single group by customer sells id
const SingleSellGroupGetByOwnIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.sellGroups.findFirst({
        where: { id: id },
        include: {
            customerPurchaseProducts: {
                include: {
                    variants: true,
                    sell: true,
                },
            },
            customerPurchase: true,
            customerPayInUser: true,
        },
    });
    return result;
});
exports.SellGroupService = {
    GetAllSellGroupService,
    SingleSellGroupService,
    GetSellGroupByCurrentDateService,
    GetSellGroupByCurrentWeekService,
    GetSellGroupByCurrentMonthService,
    GetSellGroupByCurrentYearService,
    SingleSellGroupGetByOwnIdService,
};