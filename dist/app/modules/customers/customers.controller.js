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
exports.CustomerController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../interfaces/pagination");
const customers_constant_1 = require("./customers.constant");
const customers_services_1 = require("./customers.services");
// Create a customer
const CreateCustomerController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customers_services_1.CustomerService.CreateCustomerService(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer create successfully!',
        data: result,
    });
}));
// get all customer
const GetAllCustomerController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, customers_constant_1.customerFilterAbleQuery);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationQueryKeys);
    const result = yield customers_services_1.CustomerService.GetAllCustomerService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer get successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// update customer
const UpdateCustomerController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloads = req.body;
    const { id } = req.params;
    const result = yield customers_services_1.CustomerService.UpdateCustomerService(id, payloads);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer updated success!',
        data: result,
    });
}));
// update customer
const GetSingleCustomerController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customers_services_1.CustomerService.GetSingleCustomerService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single customer get success!',
        data: result,
    });
}));
//get customer by use id
const GetCustomerByUserIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customers_services_1.CustomerService.GetCustomerByUserIdService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer get by user id!',
        data: result,
    });
}));
exports.CustomerController = {
    CreateCustomerController,
    GetAllCustomerController,
    UpdateCustomerController,
    GetSingleCustomerController,
    GetCustomerByUserIdController,
};
