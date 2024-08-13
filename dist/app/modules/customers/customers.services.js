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
exports.CustomerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const placeholderImage_1 = require("../../../assets/placeholderImage");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
const customers_constant_1 = require("./customers.constant");
// Create customer
const CreateCustomerService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // payloads
    const payloads = req.body;
    const customerId = yield (0, uniqueIdGenerator_1.generateUniqueCustomerId)('c');
    payloads.uniqueId = customerId;
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
    // Image setup
    // const filePath = `/${req.file?.destination}${req.file?.originalname}`
    // if (filePath) {
    //   payloads.profileImage = filePath
    // }
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if email already exists
        const existingEmail = yield tx.customers.findUnique({
            where: { email: payloads.email },
        });
        if (existingEmail) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Email already exists.');
        }
        // Check if phone number already exists
        const existingPhoneNo = yield tx.customers.findUnique({
            where: { phoneNo: payloads.phoneNo },
        });
        if (existingPhoneNo) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Phone number already exists.');
        }
        const result = yield tx.customers.create({ data: payloads });
        return result;
    }));
});
// get all customer
const GetAllCustomerService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // SearchTerms
    if (searchTerm) {
        andConditions.push({
            OR: customers_constant_1.customerFilterAbleKey.map(filed => ({
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
    // Pagination
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.customers.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
        include: {
            purchaseHistory: true,
            payments: true,
            customerPurchase: true,
        },
    });
    const total = yield prisma_1.default.customers.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
//  customer updated
const UpdateCustomerService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.customers.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid customer.');
    }
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if email already exists
        const existingEmail = yield tx.customers.findUnique({
            where: { email: payloads.email },
        });
        if (existingEmail) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Email already exists.');
        }
        // Check if phone number already exists
        const existingPhoneNo = yield tx.customers.findUnique({
            where: { phoneNo: payloads.phoneNo },
        });
        if (existingPhoneNo) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Phone number already exists.');
        }
        const result = yield prisma_1.default.customers.update({
            where: { id: id },
            data: payloads,
        });
        return result;
    }));
});
//  customer updated
const GetCustomerByUserIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.customers.findMany({
        where: {
            customerPurchase: {
                some: {
                    userId: id,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
        include: {
            customerPurchase: true,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid customer.');
    }
    return isExist;
});
//  customer updated
const GetSingleCustomerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.customers.findFirst({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid customer.');
    }
    return isExist;
});
exports.CustomerService = {
    CreateCustomerService,
    GetAllCustomerService,
    UpdateCustomerService,
    GetSingleCustomerService,
    GetCustomerByUserIdService,
};
