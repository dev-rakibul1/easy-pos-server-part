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
exports.PurchaseGroupController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const purchaseGroup_services_1 = require("./purchaseGroup.services");
// get all PurchaseGroup
const GetAllPurchaseGroupController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchaseGroup_services_1.PurchaseGroupService.GetAllPurchaseGroupService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchase group get successfully!',
        data: result,
    });
}));
// get all PurchaseGroup
const GetAllPurchaseGroupByCurrentDateController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchaseGroup_services_1.PurchaseGroupService.GetAllPurchaseGroupByCurrentDateService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchase group get by current date!',
        data: result,
    });
}));
// get all Purchase Group week
const GetAllPurchaseGroupByCurrentWeekController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchaseGroup_services_1.PurchaseGroupService.GetAllPurchaseGroupByCurrentWeekService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchase group get by current week!',
        data: result,
    });
}));
// get all Purchase Group month
const GetAllPurchaseGroupByCurrentMonthController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchaseGroup_services_1.PurchaseGroupService.GetAllPurchaseGroupByCurrentMonthService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchase group get by current month!',
        data: result,
    });
}));
// get all Purchase Group month
const GetAllPurchaseGroupByCurrentYearController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchaseGroup_services_1.PurchaseGroupService.GetAllPurchaseGroupByCurrentYearService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchase group get by current year!',
        data: result,
    });
}));
// get Single PurchaseGroup
const SinglePurchaseGroupController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield purchaseGroup_services_1.PurchaseGroupService.SinglePurchaseGroupService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single purchase group get successfully!',
        data: result,
    });
}));
exports.PurchaseGroupController = {
    GetAllPurchaseGroupController,
    SinglePurchaseGroupController,
    GetAllPurchaseGroupByCurrentDateController,
    GetAllPurchaseGroupByCurrentWeekController,
    GetAllPurchaseGroupByCurrentMonthController,
    GetAllPurchaseGroupByCurrentYearController,
};
