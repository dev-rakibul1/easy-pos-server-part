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
exports.SupplierSellsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create supplier sell service
const CreateSupplierSellsService = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdSupplierSells = yield prisma_1.default.supplierSell.createMany({
            data: payloads,
        });
        // 01950505981
        return createdSupplierSells;
    }
    catch (error) {
        console.error('Error creating supplier sells:', error);
        throw error; // Rethrow the error for the caller to handle
    }
});
// get all supplier sells
const GetAllSupplierSellsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplierSell.findMany({
        include: {
            supplier: true,
            user: true,
            purchase: true,
            product: {
                include: {
                    supplierSells: true,
                    variants: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
// get supplier sells by user id
const GetSupplierSellByUserIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplierSell.findMany({
        where: { userId: id },
        include: {
            supplier: true,
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
// Get Supplier Sell By Supplier And User Service
const GetSupplierSellBySupplierAndUserService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = ids;
        const [supplierId, userId] = obj.id.split(',');
        const result = yield prisma_1.default.supplierSell.findMany({
            where: { supplierId: supplierId, userId: userId },
            include: {
                supplier: true,
                user: true,
                product: {
                    include: {
                        supplierSells: true,
                        variants: true,
                    },
                },
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
const GetSingleSupplierSellService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplierSell.findUnique({
        where: { id },
        include: {
            supplier: true,
            user: true,
            product: {
                include: {
                    supplierSells: true,
                    variants: true,
                },
            },
        },
    });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid supplier sells');
    }
    return result;
});
exports.SupplierSellsService = {
    CreateSupplierSellsService,
    GetAllSupplierSellsService,
    GetSupplierSellBySupplierAndUserService,
    GetSingleSupplierSellService,
    GetSupplierSellByUserIdService,
};
