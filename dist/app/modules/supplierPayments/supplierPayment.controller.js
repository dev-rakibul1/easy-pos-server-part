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
exports.SupplierPaymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const supplierPayment_services_1 = require("./supplierPayment.services");
// Create a user
const CreateSupplierPaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield supplierPayment_services_1.SupplierPaymentService.CreateSupplierPaymentService(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier payment successfully done',
        data: result,
    });
}));
// get all user
const GetAllSupplierPaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supplierPayment_services_1.SupplierPaymentService.GetAllSupplierPaymentService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier payment get successfully',
        data: result,
    });
}));
// get by supplier and user
const GetSupplierAndUserTransSupplierPaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.params;
    const result = yield supplierPayment_services_1.SupplierPaymentService.SupplierAndUserTransSupplierPaymentService(ids);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier and user payment get successfully',
        data: result,
    });
}));
exports.SupplierPaymentController = {
    CreateSupplierPaymentController,
    GetAllSupplierPaymentController,
    GetSupplierAndUserTransSupplierPaymentController,
};
