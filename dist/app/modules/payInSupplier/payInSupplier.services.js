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
exports.PayInSupplierService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const CreatePayInSupplierService = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistSupplierSell = yield prisma_1.default.supplierSell.findFirst({
        where: { id: payloads.supplierSellId },
    });
    if (!isExistSupplierSell) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid sell');
    }
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield tx.payInSupplier.create({ data: payloads });
        // Calculate new totalPay
        const newTotalPay = isExistSupplierSell.totalPay + payloads.payAmount;
        const newTotalDue = isExistSupplierSell.totalDue - payloads.payAmount;
        // Update totalPay in supplierSell
        yield tx.supplierSell.update({
            where: { id: payloads.supplierSellId },
            data: {
                totalPay: newTotalPay,
                totalDue: newTotalDue,
            },
        });
        return result;
    }));
});
exports.PayInSupplierService = {
    CreatePayInSupplierService,
};
