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
exports.CustomerPurchaseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Get Supplier Sell By Supplier And User Service
const GetCustomerPurchaseByCustomerAndUserService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = ids;
        const [customerId, userId] = obj.id.split(',');
        const result = yield prisma_1.default.customerPurchase.findMany({
            where: { customerId: customerId, userId: userId },
            include: {
                customer: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
// Get Supplier Sell By Supplier And User Service
const GetSingleCustomerPurchaseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customerPurchase.findUnique({
        where: { id },
        include: {
            customer: true,
        },
    });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid customer purchase');
    }
    return result;
});
// Get customer purchase by current date
const GetSingleCustomerPurchaseByCurrentDateService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const result = yield prisma_1.default.customerPurchase.findMany({
        where: {
            createdAt: {
                gte: today,
                lt: tomorrow,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
        },
    });
    return result;
});
// Get customer purchase by current date
const GetByUserIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customerPurchase.findMany({
        where: {
            userId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            customer: true,
        },
    });
    return result;
});
exports.CustomerPurchaseService = {
    GetCustomerPurchaseByCustomerAndUserService,
    GetSingleCustomerPurchaseService,
    GetSingleCustomerPurchaseByCurrentDateService,
    GetByUserIdService,
};
