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
exports.SupplierSellProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create get supplier sell product service
const GetAllSupplierSellProductService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplierSellProduct.findMany({
        include: {
            variants: true,
            _count: true,
        },
    });
    return result;
});
// get by user and supplier service
const GetByUserAndSupplierService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = ids;
        const [supplierId, userId] = obj.id.split(',');
        const result = yield prisma_1.default.supplierSellProduct.findMany({
            where: { supplierId: supplierId, userId: userId },
            include: {
                variants: true,
                _count: true,
            },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const GetSingleSupplierSellProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplierSellProduct.findFirst({
        where: { id },
        include: {
            variants: true,
            _count: true,
        },
    });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid supplier sell product');
    }
    return result;
});
exports.SupplierSellProductService = {
    GetAllSupplierSellProductService,
    GetByUserAndSupplierService,
    GetSingleSupplierSellProductService,
};
