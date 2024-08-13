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
exports.CustomerPaymentService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
// Create customer payment
const CreateCustomerPaymentService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = yield (0, uniqueIdGenerator_1.generateUniqueCustomerPaymentId)('cpd');
    payload.uniqueId = customerId;
    const result = yield prisma_1.default.customerPayments.create({ data: payload });
    return result;
});
// get all customer payment
const GetAllCustomerPaymentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customerPayments.findMany({
        include: {
            customer: true,
            user: true,
        },
    });
    return result;
});
exports.CustomerPaymentService = {
    CreateCustomerPaymentService,
    GetAllCustomerPaymentService,
};
