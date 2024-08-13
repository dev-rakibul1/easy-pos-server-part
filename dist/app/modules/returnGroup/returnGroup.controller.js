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
exports.ReturnGroupController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../interfaces/pagination");
const returnGroup_services_1 = require("./returnGroup.services");
// get all ReturnGroup
const GetAllReturnGroupController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, [
        'searchTerm',
        'uniqueId',
        'userId',
        'supplierId',
    ]);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationQueryKeys);
    const result = yield returnGroup_services_1.ReturnGroupService.GetAllReturnGroupService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Return group get successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// get Single ReturnGroup
const SingleReturnGroupController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield returnGroup_services_1.ReturnGroupService.SingleReturnGroupService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Return group get successfully!',
        data: result,
    });
}));
// get  ReturnGroup by current date
const SingleReturnGroupByCurrentDateController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield returnGroup_services_1.ReturnGroupService.GetReturnGroupByCurrentDateService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Return group get by current date!',
        data: result,
    });
}));
// get  ReturnGroup by current week
const SingleReturnGroupByCurrentWeekController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield returnGroup_services_1.ReturnGroupService.GetReturnGroupByCurrentWeekService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Return group get by current week!',
        data: result,
    });
}));
// get  ReturnGroup by current month
const SingleReturnGroupByCurrentMonthController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield returnGroup_services_1.ReturnGroupService.GetReturnGroupByCurrentMonthService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Return group get by current month!',
        data: result,
    });
}));
// get  ReturnGroup by current year
const SingleReturnGroupByCurrentYearController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield returnGroup_services_1.ReturnGroupService.GetReturnGroupByCurrentYearService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Return group get by current year!',
        data: result,
    });
}));
exports.ReturnGroupController = {
    GetAllReturnGroupController,
    SingleReturnGroupController,
    SingleReturnGroupByCurrentDateController,
    SingleReturnGroupByCurrentWeekController,
    SingleReturnGroupByCurrentMonthController,
    SingleReturnGroupByCurrentYearController,
};
