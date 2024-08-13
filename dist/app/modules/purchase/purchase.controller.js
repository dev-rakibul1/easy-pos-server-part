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
exports.PurchaseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../interfaces/pagination");
const purchase_services_1 = require("./purchase.services");
// Purchase product
const CreatePurchaseController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield purchase_services_1.PurchaseService.CreatePurchaseService(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchase successfully!',
        data: result,
    });
}));
// get all purchase
const GetAllPurchaseController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['color', 'uniqueId', 'searchTerm']);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationQueryKeys);
    const result = yield purchase_services_1.PurchaseService.GetAllCreatePurchaseService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All purchase get successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// get all purchase by current date
const GetAllPurchaseByCurrentDateController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_services_1.PurchaseService.GetAllPurchaseByCurrentDateService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All purchase get by current date!',
        data: result,
    });
}));
// get all purchase by current week
const GetAllPurchaseByCurrentWeekController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_services_1.PurchaseService.GetAllPurchaseByCurrentWeekService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All purchase get by current week!',
        data: result,
    });
}));
// get all purchase by current month
const GetAllPurchaseByCurrentMonthController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_services_1.PurchaseService.GetAllPurchaseByCurrentMonthService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All purchase get by current month!',
        data: result,
    });
}));
// get all purchase by current year
const GetAllPurchaseByCurrentYearController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_services_1.PurchaseService.GetAllPurchaseByCurrentYearService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All purchase get by current year!',
        data: result,
    });
}));
// purchase updated
const UpdatePurchaseController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id } = req.params;
    const result = yield purchase_services_1.PurchaseService.UpdateCreatePurchaseService(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchase updated success',
        data: result,
    });
}));
// Purchase buy supplier and user
const GetBySupplierAndUserPurchaseController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.params;
    const result = yield purchase_services_1.PurchaseService.GetBuySupplierAndUserPurchaseService(ids);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get purchase by supplier and user successfully',
        data: result,
    });
}));
// Single purchase get
const GetSinglePurchaseController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield purchase_services_1.PurchaseService.GetSinglePurchaseService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single purchase get successfully',
        data: result,
    });
}));
exports.PurchaseController = {
    CreatePurchaseController,
    GetAllPurchaseController,
    UpdatePurchaseController,
    GetBySupplierAndUserPurchaseController,
    GetSinglePurchaseController,
    GetAllPurchaseByCurrentDateController,
    GetAllPurchaseByCurrentWeekController,
    GetAllPurchaseByCurrentMonthController,
    GetAllPurchaseByCurrentYearController,
};
