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
exports.ReturnController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const return_services_1 = require("./return.services");
// Create a return
const CreateReturnController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield return_services_1.ReturnService.CreateReturnService(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product return success!',
        data: result,
    });
}));
// get all return
const GetAllReturnController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield return_services_1.ReturnService.GetAllReturnService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All return product get successfully!',
        data: result,
    });
}));
// get all return
const GetAllReturnByCurrentDateController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield return_services_1.ReturnService.GetAllReturnByCurrentDateService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All return product get by current date!',
        data: result,
    });
}));
// get all return by current week
const GetAllReturnByCurrentWeekController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield return_services_1.ReturnService.GetAllReturnByCurrentWeekService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All return product get by current week!',
        data: result,
    });
}));
// get all return by current month
const GetAllReturnByCurrentMonthController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield return_services_1.ReturnService.GetAllReturnByCurrentMonthService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All return product get by current month!',
        data: result,
    });
}));
// get all return by current month
const GetAllReturnByCurrentYearController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield return_services_1.ReturnService.GetAllReturnByCurrentYearService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All return product get by current year!',
        data: result,
    });
}));
exports.ReturnController = {
    CreateReturnController,
    GetAllReturnController,
    GetAllReturnByCurrentDateController,
    GetAllReturnByCurrentWeekController,
    GetAllReturnByCurrentMonthController,
    GetAllReturnByCurrentYearController,
};
