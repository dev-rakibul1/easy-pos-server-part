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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
// Create Brand service
const CreateBrandService = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const BrandId = yield (0, uniqueIdGenerator_1.generateUniqueBrandId)('bra');
    payloads.uniqueId = BrandId;
    const BrandCreate = yield prisma_1.default.brands.create({ data: payloads });
    return BrandCreate;
});
// get all Brand
const GetAllBrandService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['description', 'brandName'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // Filters
    if (Object.keys(filterData).length) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    // Pagination
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    // Where condition
    const whereConditions = andConditions.length
        ? { AND: andConditions }
        : {};
    const result = yield prisma_1.default.brands.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.brands.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// get single brand service
const GetSingleBrandService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brands.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid brand.');
    }
    return isExist;
});
// Updated brand service
const UpdateBrandService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brands.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid brand.');
    }
    const result = yield prisma_1.default.brands.update({
        where: { id: id },
        data: payloads,
    });
    return result;
});
// Delete brand service
const DeleteBrandService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brands.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid unit.');
    }
    const result = yield prisma_1.default.brands.delete({ where: { id: id } });
    return result;
});
exports.BrandService = {
    CreateBrandService,
    GetAllBrandService,
    GetSingleBrandService,
    UpdateBrandService,
    DeleteBrandService,
};
