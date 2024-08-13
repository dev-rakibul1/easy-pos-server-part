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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseGroupService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// get all purchase group
const GetAllPurchaseGroupService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.purchaseGroup.findMany({
        include: {
            supplierSellProducts: {
                include: {
                    variants: true,
                    purchase: true,
                },
            },
            supplierSells: true,
            payInSupplier: true,
        },
    });
    return result;
});
// get all purchase group
const GetAllPurchaseGroupByCurrentDateService = () => __awaiter(void 0, void 0, void 0, function* () {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = yield prisma_1.default.purchaseGroup.findMany({
        include: {
            supplierSellProducts: {
                include: {
                    variants: true,
                    purchase: true,
                },
            },
            supplierSells: true,
            payInSupplier: true,
        },
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
// get all purchase group week
const GetAllPurchaseGroupByCurrentWeekService = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.purchaseGroup.findMany({
        include: {
            supplierSellProducts: {
                include: {
                    variants: true,
                    purchase: true,
                },
            },
            supplierSells: true,
            payInSupplier: true,
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
// get all purchase group week
const GetAllPurchaseGroupByCurrentMonthService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get the start of the next month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const result = yield prisma_1.default.purchaseGroup.findMany({
        include: {
            supplierSellProducts: {
                include: {
                    variants: true,
                    purchase: true,
                },
            },
            supplierSells: true,
            payInSupplier: true,
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
// get all purchase group year
const GetAllPurchaseGroupByCurrentYearService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date one year ago
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const result = yield prisma_1.default.purchaseGroup.findMany({
        include: {
            supplierSellProducts: {
                include: {
                    variants: true,
                    purchase: true,
                },
            },
            supplierSells: true,
            payInSupplier: true,
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
// get single group by supplier sells id
const SinglePurchaseGroupService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.purchaseGroup.findFirst({
        where: { supplierSells: { id: id } },
        include: {
            supplierSellProducts: {
                include: {
                    variants: true,
                    purchase: true,
                },
            },
            supplierSells: true,
            payInSupplier: true,
        },
    });
    return result;
});
exports.PurchaseGroupService = {
    GetAllPurchaseGroupService,
    SinglePurchaseGroupService,
    GetAllPurchaseGroupByCurrentDateService,
    GetAllPurchaseGroupByCurrentWeekService,
    GetAllPurchaseGroupByCurrentMonthService,
    GetAllPurchaseGroupByCurrentYearService,
};
