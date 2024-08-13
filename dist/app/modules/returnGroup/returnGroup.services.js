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
exports.ReturnGroupService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// get all Return group
const GetAllReturnGroupService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['uniqueId', 'userId', 'supplierId'].map(field => ({
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
    const result = yield prisma_1.default.returnGroups.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            supplierReturnPayments: {
                include: {
                    user: true,
                },
            },
            userReturnProducts: {
                include: {
                    returns: true,
                },
            },
        },
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.returnGroups.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// get single group by supplier sells id
const SingleReturnGroupService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.returnGroups.findFirst({
        where: { supplierReturnPayments: { id: id } },
        include: {
            supplierReturnPayments: {
                include: {
                    user: true,
                },
            },
            userReturnProducts: {
                include: {
                    returns: true,
                },
            },
            additionalMoneyBack: true,
        },
    });
    return result;
});
// get return group by current date
const GetReturnGroupByCurrentDateService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = yield prisma_1.default.returnGroups.findMany({
        where: {
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
        include: {
            supplierReturnPayments: {
                include: {
                    user: true,
                },
            },
            userReturnProducts: {
                include: {
                    returns: true,
                },
            },
            additionalMoneyBack: true,
        },
    });
    return result;
});
// get return group by current week
const GetReturnGroupByCurrentWeekService = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.returnGroups.findMany({
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
            supplierReturnPayments: {
                include: {
                    user: true,
                },
            },
            userReturnProducts: {
                include: {
                    returns: true,
                },
            },
            additionalMoneyBack: true,
        },
    });
    return result;
});
// get return group by current week
const GetReturnGroupByCurrentMonthService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get the start of the next month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const result = yield prisma_1.default.returnGroups.findMany({
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
            supplierReturnPayments: {
                include: {
                    user: true,
                },
            },
            userReturnProducts: {
                include: {
                    returns: true,
                },
            },
            additionalMoneyBack: true,
        },
    });
    return result;
});
// get return group by current week
const GetReturnGroupByCurrentYearService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date one year ago
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const result = yield prisma_1.default.returnGroups.findMany({
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
            supplierReturnPayments: {
                include: {
                    user: true,
                },
            },
            userReturnProducts: {
                include: {
                    returns: true,
                },
            },
            additionalMoneyBack: true,
        },
    });
    return result;
});
exports.ReturnGroupService = {
    GetAllReturnGroupService,
    SingleReturnGroupService,
    GetReturnGroupByCurrentDateService,
    GetReturnGroupByCurrentWeekService,
    GetReturnGroupByCurrentMonthService,
    GetReturnGroupByCurrentYearService,
};
