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
exports.SupplierPaymentService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
// Create user
const CreateSupplierPaymentService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const supplierPaymentId = yield (0, uniqueIdGenerator_1.generateUniqueSupplierPaymentId)('spd');
    payload.uniqueId = supplierPaymentId;
    const result = yield prisma_1.default.supplierPayment.create({ data: payload });
    return result;
});
// get all user
const GetAllSupplierPaymentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplierPayment.findMany({
        include: {
            supplier: true,
            user: true,
        },
    });
    return result;
});
// Supplier And User Trans
const SupplierAndUserTransSupplierPaymentService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = ids;
        const [supplierId, userId] = obj.id.split(',');
        const result = yield prisma_1.default.supplierPayment.findFirst({
            where: { supplierId: supplierId, userId: userId },
        });
        return result;
    }
    catch (error) {
        console.error('Error retrieving supplier amount:', error);
        throw error; // Rethrow the error to propagate it up the call stack
    }
});
exports.SupplierPaymentService = {
    CreateSupplierPaymentService,
    GetAllSupplierPaymentService,
    SupplierAndUserTransSupplierPaymentService,
};
