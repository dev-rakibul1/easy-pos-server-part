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
exports.ProductsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const placeholderImage_1 = require("../../../assets/placeholderImage");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
const product_constant_1 = require("./product.constant");
// Create user
const CreateUserService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    const productId = yield (0, uniqueIdGenerator_1.generateUniqueProductId)('p');
    payload.uniqueId = productId;
    if (payload.productImage) {
        const file = req.file;
        const uploadedImage = yield fileUploader_1.FileUploads.uploadToCloudinary(file);
        if (uploadedImage) {
            payload.productImage = uploadedImage.secure_url;
        }
    }
    else {
        payload.productImage = yield (0, placeholderImage_1.placeholderProduct)();
    }
    // const filePath = `/${req.file?.destination}${req.file?.originalname}`
    // if (filePath) {
    //   payload.productImage = filePath
    // }
    // @ts-ignore
    payload.productStock = (_a = payload.variants) === null || _a === void 0 ? void 0 : _a.length;
    console.log(payload);
    // Save the product to the database
    const result = yield prisma_1.default.product.create({ data: payload });
    return result;
});
// get all product
const GetAllCreateUserService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Filters
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // SearchTerm
    if (searchTerm) {
        andConditions.push({
            OR: product_constant_1.productFilterableKey.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // Filter data
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
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    // Where condition
    const whereConditions = andConditions.length
        ? { AND: andConditions }
        : {};
    const result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? {
                [paginationOptions.sortBy]: paginationOptions.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            variants: true,
            purchases: true,
        },
    });
    const total = yield prisma_1.default.product.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// get all product
const SingleProductGetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.product.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid product.');
    }
    const result = yield prisma_1.default.product.findUnique({
        where: { id: id },
        include: {
            variants: true,
            purchases: true,
        },
    });
    return result;
});
// Update product
const UpdateProductGetService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.product.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid product.');
    }
    const result = yield prisma_1.default.product.update({
        where: { id: id },
        data: payloads,
    });
    return result;
});
// delete product
const DeleteProductGetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.product.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid product.');
    }
    const result = yield prisma_1.default.product.delete({
        where: { id: id },
    });
    return result;
});
// Stock in product
const StockInProductGetService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findMany({
        where: {
            variants: {
                some: {},
            },
        },
        include: {
            variants: true,
        },
    });
    return result;
});
exports.ProductsService = {
    CreateUserService,
    GetAllCreateUserService,
    SingleProductGetService,
    UpdateProductGetService,
    DeleteProductGetService,
    StockInProductGetService,
};
