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
exports.SellController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../interfaces/pagination");
const sell_constant_1 = require("./sell.constant");
const sell_services_1 = require("./sell.services");
// Create a sell
const CreateSellController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloads = req.body;
    const result = yield sell_services_1.SellService.CreateSellService(payloads);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sales success!',
        data: result,
    });
}));
// get all sell
const GetAllSellController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, sell_constant_1.sellFilterableQuery);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationQueryKeys);
    const result = yield sell_services_1.SellService.GetAllSellService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sell get successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// get all sell by current date
const GetAllSellByCurrentDateController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sell_services_1.SellService.GetAllSellByCurrentDateService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sell get by current date.',
        data: result,
    });
}));
// get all sell by current week
const GetAllSellByCurrentWeekController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sell_services_1.SellService.GetAllSellByCurrentWeekService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sell get by current week.',
        data: result,
    });
}));
// get all sell by current month
const GetAllSellByCurrentMonthController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sell_services_1.SellService.GetAllSellByCurrentMonthService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sell get by current month.',
        data: result,
    });
}));
// get all sell by current year
const GetAllSellByCurrentYearController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sell_services_1.SellService.GetAllSellByCurrentYearService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sell get by current year.',
        data: result,
    });
}));
// get all sell by current date
const SellGetByCustomerPurchaseIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield sell_services_1.SellService.SellGetByCustomerPurchaseIdService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sell get by customer-purchase id.',
        data: result,
    });
}));
// get single sells
const GetSingleSellController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield sell_services_1.SellService.GetSingleSellService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single sell get success.',
        data: result,
    });
}));
exports.SellController = {
    CreateSellController,
    GetAllSellController,
    GetAllSellByCurrentDateController,
    GetAllSellByCurrentWeekController,
    GetAllSellByCurrentMonthController,
    GetAllSellByCurrentYearController,
    SellGetByCustomerPurchaseIdController,
    GetSingleSellController,
};
