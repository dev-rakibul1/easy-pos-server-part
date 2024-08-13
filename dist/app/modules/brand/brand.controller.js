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
exports.BrandController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../interfaces/pagination");
const brand_services_1 = require("./brand.services");
// Create a color
const CreateBrandController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield brand_services_1.BrandService.CreateBrandService(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Brand added success!',
        data: result,
    });
}));
// get all brand
const GetAllBrandController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['description', 'brandName', 'searchTerm']);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationQueryKeys);
    const result = yield brand_services_1.BrandService.GetAllBrandService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Brand get successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// get single brand
const GetSingleBrandController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_services_1.BrandService.GetSingleBrandService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single brand get successfully!',
        data: result,
    });
}));
// updated brand
const UpdateBrandController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payloads = req.body;
    const result = yield brand_services_1.BrandService.UpdateBrandService(id, payloads);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Updated brand successfully!',
        data: result,
    });
}));
// deleted brand
const DeleteBrandController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_services_1.BrandService.DeleteBrandService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Brand deleted successfully!',
        data: result,
    });
}));
exports.BrandController = {
    CreateBrandController,
    GetAllBrandController,
    DeleteBrandController,
    UpdateBrandController,
    GetSingleBrandController,
};
