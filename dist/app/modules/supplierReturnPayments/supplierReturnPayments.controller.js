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
exports.SupplierReturnPaymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const supplierReturnPayments_services_1 = require("./supplierReturnPayments.services");
// get all supplier return payment
const GetReturnByUserAndSupplierController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.params;
    const result = yield supplierReturnPayments_services_1.SupplierReturnPaymentService.GetSupplierReturnPaymentByUserAndSupplierService(ids);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier return payment get by supplier and user success!',
        data: result,
    });
}));
// get all supplier return payment
const GetSingleSupplierReturnPaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield supplierReturnPayments_services_1.SupplierReturnPaymentService.GetSingleSupplierReturnPaymentService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single supplier return payment get success!',
        data: result,
    });
}));
exports.SupplierReturnPaymentController = {
    GetReturnByUserAndSupplierController,
    GetSingleSupplierReturnPaymentController,
};
