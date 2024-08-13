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
exports.SupplierService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const placeholderImage_1 = require("../../../assets/placeholderImage");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
const supplier_constant_1 = require("./supplier.constant");
// Create supplier
const CreateSupplierService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payloads = req.body;
    const supplierId = yield (0, uniqueIdGenerator_1.generateUniqueSupplierId)('S');
    payloads.uniqueId = supplierId;
    if (payloads.profileImage) {
        const file = req.file;
        const uploadedImage = yield fileUploader_1.FileUploads.uploadToCloudinary(file);
        if (uploadedImage) {
            payloads.profileImage = uploadedImage.secure_url;
        }
    }
    else {
        payloads.profileImage = yield (0, placeholderImage_1.placeholderUser)();
    }
    // const filePath = `/${req.file?.destination}${req.file?.originalname}`
    // if (filePath) {
    //   payloads.profileImage = filePath
    // }
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const existingEmail = yield tx.suppliers.findUnique({
            where: { email: payloads.email },
        });
        if (existingEmail) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Email already exists.');
        }
        // Check if phone number already exists
        const existingPhoneNo = yield tx.suppliers.findUnique({
            where: { phoneNo: payloads.phoneNo },
        });
        if (existingPhoneNo) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Phone number already exists.');
        }
        const result = yield tx.suppliers.create({ data: payloads });
        return result;
    }));
});
// get all supplier
const GetAllSupplierUserService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // SearchTerms
    if (searchTerm) {
        andConditions.push({
            OR: supplier_constant_1.supplierFilterableKey.map(filed => ({
                [filed]: {
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
    // Where conditions
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // pagination
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.suppliers.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
        include: {
            payments: true,
            purchase: true,
            supplierSell: true,
            supplierSellProducts: true,
            returnHistory: true,
        },
    });
    const total = yield prisma_1.default.suppliers.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// Update supplier
const UpdateSupplierUserService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the existing supplier
    const isExist = yield prisma_1.default.suppliers.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid supplier.');
    }
    // Check if email is being updated and if it already exists
    if ((payloads === null || payloads === void 0 ? void 0 : payloads.email) && payloads.email !== isExist.email) {
        const existingEmail = yield prisma_1.default.suppliers.findFirst({
            where: { email: payloads.email },
        });
        if (existingEmail) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Email already exists.');
        }
    }
    // Check if phone number is being updated and if it already exists
    if ((payloads === null || payloads === void 0 ? void 0 : payloads.phoneNo) && payloads.phoneNo !== isExist.phoneNo) {
        const existingPhoneNo = yield prisma_1.default.suppliers.findFirst({
            where: { phoneNo: payloads.phoneNo },
            include: {
                payments: true,
                purchase: true,
                supplierSell: true,
                supplierSellProducts: true,
                returnHistory: true,
            },
        });
        if (existingPhoneNo) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Phone number already exists.');
        }
    }
    // Update the supplier within a transaction
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedSupplier = yield tx.suppliers.update({
            where: { id: id },
            data: payloads,
        });
        return updatedSupplier;
    }));
    return result;
});
// Update supplier
const GetSingleSupplierService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the existing supplier
    const isExist = yield prisma_1.default.suppliers.findUnique({
        where: { id: id },
        include: {
            payments: true,
            purchase: true,
            supplierSell: true,
            supplierSellProducts: true,
            returnHistory: true,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid supplier.');
    }
    return isExist;
});
// Supplier filter by supplier, user and product
const GetSuppliersByUserSupplierProductService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [userId, productId] = ids.id.split(',');
        const result = yield prisma_1.default.suppliers.findMany({
            where: {
                purchase: {
                    some: {
                        userId: userId,
                        productId: productId,
                    },
                },
            },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
// Supplier filter by supplier, user and product
const GetByUserIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.suppliers.findMany({
            where: {
                supplierSell: {
                    some: {
                        userId: id,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                supplierSell: true,
            },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.SupplierService = {
    CreateSupplierService,
    GetAllSupplierUserService,
    UpdateSupplierUserService,
    GetSingleSupplierService,
    GetSuppliersByUserSupplierProductService,
    GetByUserIdService,
};
