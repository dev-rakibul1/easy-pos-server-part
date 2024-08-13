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
exports.SupplierSellController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const supplierSell_services_1 = require("./supplierSell.services");
// Create a Supplier Sell
const CreateSupplierSellController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield supplierSell_services_1.SupplierSellsService.CreateSupplierSellsService(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier sell success!',
        data: result,
    });
}));
// get all SupplierSell
const GetAllSupplierSellController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supplierSell_services_1.SupplierSellsService.GetAllSupplierSellsService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier sell get successfully!',
        data: result,
    });
}));
// get all SupplierSell
const GetSupplierSellBySupplierAndUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.params;
    const result = yield supplierSell_services_1.SupplierSellsService.GetSupplierSellBySupplierAndUserService(ids);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier sell get by supplier and user success!',
        data: result,
    });
}));
// get supplier sell by user id
const GetSupplierSellByUserIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield supplierSell_services_1.SupplierSellsService.GetSupplierSellByUserIdService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Supplier sell get by user id!',
        data: result,
    });
}));
// get all SupplierSell
const GetSingleSupplierSellController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield supplierSell_services_1.SupplierSellsService.GetSingleSupplierSellService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single sells get success!',
        data: result,
    });
}));
exports.SupplierSellController = {
    GetAllSupplierSellController,
    CreateSupplierSellController,
    GetSupplierSellBySupplierAndUserController,
    GetSingleSupplierSellController,
    GetSupplierSellByUserIdController,
};
