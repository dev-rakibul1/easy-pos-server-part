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
exports.SupplierController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../interfaces/pagination");
const supplier_constant_1 = require("./supplier.constant");
const supplier_services_1 = require("./supplier.services");
// Create a supplier
const CreateSupplierController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supplier_services_1.SupplierService.CreateSupplierService(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier create successfully!',
        data: result,
    });
}));
// get all supplier
const GetAllSupplierController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, supplier_constant_1.supplierFilterAbleQuery);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationQueryKeys);
    const result = yield supplier_services_1.SupplierService.GetAllSupplierUserService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier get successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// updated  supplier
const UpdateSupplierController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloads = req.body;
    const { id } = req.params;
    const result = yield supplier_services_1.SupplierService.UpdateSupplierUserService(id, payloads);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier updated successfully!',
        data: result,
    });
}));
// get single  supplier
const GetSingleSupplierController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield supplier_services_1.SupplierService.GetSingleSupplierService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Supplier get successfully!',
        data: result,
    });
}));
// get supplier by supplier, product and user
const GetBySuppliersByUserSupplierProductController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.params;
    const result = yield supplier_services_1.SupplierService.GetSuppliersByUserSupplierProductService(ids);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get supplier by supplier, user and product successfully',
        data: result,
    });
}));
// get by user id
const GetByUserIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield supplier_services_1.SupplierService.GetByUserIdService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get by user id.',
        data: result,
    });
}));
exports.SupplierController = {
    CreateSupplierController,
    GetAllSupplierController,
    UpdateSupplierController,
    GetSingleSupplierController,
    GetBySuppliersByUserSupplierProductController,
    GetByUserIdController,
};
