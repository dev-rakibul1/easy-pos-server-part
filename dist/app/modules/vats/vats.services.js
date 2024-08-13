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
exports.VatService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
// Create Vat service
const CreateVatService = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const VatId = yield (0, uniqueIdGenerator_1.generateUniqueVatId)('vat');
    payloads.uniqueId = VatId;
    const VatCreate = yield prisma_1.default.vats.create({ data: payloads });
    return VatCreate;
});
// get all Vat
const GetAllVatService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // searchTerm
    if (searchTerm) {
        andConditions.push({
            OR: ['name', 'vatType'].map(field => ({
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
    const result = yield prisma_1.default.vats.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.vats.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// get all Vat
const UpdateVatService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vats.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid vats.');
    }
    const result = yield prisma_1.default.vats.update({
        where: { id: id },
        data: payloads,
    });
    return result;
});
// get single Vat
const GetSingleVatService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vats.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid vats.');
    }
    return isExist;
});
// delete Vat
const DeleteVatService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vats.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid vats.');
    }
    const result = yield prisma_1.default.vats.delete({
        where: { id: id },
    });
    return result;
});
exports.VatService = {
    CreateVatService,
    GetAllVatService,
    UpdateVatService,
    GetSingleVatService,
    DeleteVatService,
};
