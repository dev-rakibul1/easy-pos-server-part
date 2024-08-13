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
exports.CustomerPurchaseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const customerPurchase_services_1 = require("./customerPurchase.services");
// get all customer purchase
const GetCustomerPurchaseByCustomerAndUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.params;
    const result = yield customerPurchase_services_1.CustomerPurchaseService.GetCustomerPurchaseByCustomerAndUserService(ids);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer purchase get by customer and user success!',
        data: result,
    });
}));
// get all customer purchase
const GetSingleCustomerPurchaseController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customerPurchase_services_1.CustomerPurchaseService.GetSingleCustomerPurchaseService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single customer purchase get success!',
        data: result,
    });
}));
// get all customer purchase
const GetCustomerPurchaseByCurrentDateController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customerPurchase_services_1.CustomerPurchaseService.GetSingleCustomerPurchaseByCurrentDateService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single customer purchase get by current date!',
        data: result,
    });
}));
// get all customer purchase
const GetByUserIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customerPurchase_services_1.CustomerPurchaseService.GetByUserIdService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer purchase by user id!',
        data: result,
    });
}));
exports.CustomerPurchaseController = {
    GetCustomerPurchaseByCustomerAndUserController,
    GetSingleCustomerPurchaseController,
    GetCustomerPurchaseByCurrentDateController,
    GetByUserIdController,
};
