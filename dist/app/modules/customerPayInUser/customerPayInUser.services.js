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
exports.CustomerPayInUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const CreateCustomerPayInUserService = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCustomerPurchase = yield prisma_1.default.customerPurchase.findFirst({
        where: { id: payloads.customerPurchaseId },
    });
    if (!isExistCustomerPurchase) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid purchase');
    }
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield tx.customerPayInUser.create({ data: payloads });
        // Calculate new totalPay
        const newTotalPay = isExistCustomerPurchase.totalPay + payloads.payAmount;
        const newTotalDue = isExistCustomerPurchase.totalDue - payloads.payAmount;
        // Update totalPay in supplierSell
        yield tx.customerPurchase.update({
            where: { id: payloads.customerPurchaseId },
            data: {
                totalPay: newTotalPay,
                totalDue: newTotalDue,
            },
        });
        return result;
    }));
});
exports.CustomerPayInUserService = {
    CreateCustomerPayInUserService,
};
