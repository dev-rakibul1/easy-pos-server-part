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
exports.AdditionalExpensesService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
const CreateAdditionalExpensesService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, uniqueIdGenerator_1.generateUniqueAdditionalExpenseId)('AEI');
    payload.uniqueId = id;
    const result = yield prisma_1.default.additionalExpenses.create({ data: payload });
    return result;
});
const CreateAdditionalExpensesGetByCurrentDateService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = yield prisma_1.default.additionalExpenses.findMany({
        where: {
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const CreateAdditionalExpensesGetByCurrentWeekService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const result = yield prisma_1.default.additionalExpenses.findMany({
        where: {
            createdAt: {
                gte: today,
                lt: tomorrow,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const CreateAdditionalExpensesGetByCurrentMonthService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get the start of the next month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const result = yield prisma_1.default.additionalExpenses.findMany({
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
const CreateAdditionalExpensesGetByCurrentYearService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date one year ago
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const result = yield prisma_1.default.additionalExpenses.findMany({
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
const GetAllAdditionalExpensesService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['details', 'uniqueId'].map(field => ({
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
    const whereConditions = andConditions.length ? { AND: andConditions } : {};
    const result = yield prisma_1.default.additionalExpenses.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.additionalExpenses.count();
    return {
        meta: {
            limit,
            page,
            total,
        },
        data: result,
    };
});
const UpdateAdditionalExpensesService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.additionalExpenses.findUnique({
        where: { id: id },
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid additional expense.');
    }
    const result = yield prisma_1.default.additionalExpenses.update({
        where: { id: id },
        data: payloads,
    });
    return result;
});
const SingleAdditionalExpensesGetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.additionalExpenses.findUnique({
        where: { id: id },
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid additional expense.');
    }
    return isExist;
});
const DeleteAdditionalExpensesService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const isExist = yield prisma_1.default.additionalExpenses.findFirst({
        where: { id: id },
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid additional expense.');
    }
    console.log(id);
    const result = yield prisma_1.default.additionalExpenses.delete({ where: { id: id } });
    return result;
});
exports.AdditionalExpensesService = {
    CreateAdditionalExpensesService,
    CreateAdditionalExpensesGetByCurrentDateService,
    CreateAdditionalExpensesGetByCurrentWeekService,
    CreateAdditionalExpensesGetByCurrentMonthService,
    CreateAdditionalExpensesGetByCurrentYearService,
    GetAllAdditionalExpensesService,
    UpdateAdditionalExpensesService,
    SingleAdditionalExpensesGetService,
    DeleteAdditionalExpensesService,
};
