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
exports.AdditionalExpensesController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../interfaces/pagination");
const AdditionalExpenses_services_1 = require("./AdditionalExpenses.services");
// Create Additional Expenses
const CreateAdditionalExpensesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.CreateAdditionalExpensesService(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Additional expenses create success!',
        data: result,
    });
}));
// get by current date Additional Expenses
const CreateAdditionalExpensesGetByCurrentDateController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentDateService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Additional expenses get success! by current date',
        data: result,
    });
}));
// get by current week Additional Expenses
const CreateAdditionalExpensesGetByCurrentWeekController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentWeekService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Additional expenses get success! by current week',
        data: result,
    });
}));
// get by current month Additional Expenses
const CreateAdditionalExpensesGetByCurrentMonthController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentMonthService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Additional expenses get success! by current month',
        data: result,
    });
}));
// get by current year Additional Expenses
const CreateAdditionalExpensesGetByCurrentYearController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.CreateAdditionalExpensesGetByCurrentYearService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Additional expenses get success! by current year',
        data: result,
    });
}));
// get all Additional Expenses
const GetAllAdditionalExpensesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['details', 'uniqueId', 'searchTerm']);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationQueryKeys);
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.GetAllAdditionalExpensesService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Additional expenses get success!',
        meta: result.meta,
        data: result.data,
    });
}));
// update Additional Expenses
const UpdateAdditionalExpensesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payloads = req.body;
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.UpdateAdditionalExpensesService(id, payloads);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Additional expenses update success!',
        data: result,
    });
}));
// Single Additional Expenses
const SingleAdditionalExpensesGetController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.SingleAdditionalExpensesGetService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single additional expenses get success!',
        data: result,
    });
}));
// Delete Single Additional Expenses
const DeleteAdditionalExpensesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield AdditionalExpenses_services_1.AdditionalExpensesService.DeleteAdditionalExpensesService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single additional expenses delete success!',
        data: result,
    });
}));
exports.AdditionalExpensesController = {
    CreateAdditionalExpensesController,
    CreateAdditionalExpensesGetByCurrentDateController,
    CreateAdditionalExpensesGetByCurrentWeekController,
    CreateAdditionalExpensesGetByCurrentMonthController,
    CreateAdditionalExpensesGetByCurrentYearController,
    GetAllAdditionalExpensesController,
    UpdateAdditionalExpensesController,
    SingleAdditionalExpensesGetController,
    DeleteAdditionalExpensesController,
};
