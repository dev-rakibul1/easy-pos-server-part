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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const placeholderImage_1 = require("../../../assets/placeholderImage");
const role_1 = require("../../../enums/role");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
const users_constant_1 = require("./users.constant");
// Create user
const CreateUserService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payloads = req.body;
    const userId = yield (0, uniqueIdGenerator_1.generateUniqueId)('u');
    payloads.uniqueId = userId;
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
    // image setup
    // const filePath = `/${req.file?.destination}${req.file?.originalname}`
    // if (filePath) {
    //   payloads.profileImage = filePath
    // }
    // Password Bcrypt
    if (!payloads.password) {
        const saltPass = yield bcrypt_1.default.hash(role_1.PAYLOADS.DEFAULT_USER_PASSWORD, role_1.PAYLOADS.PASSWORD_SALT_ROUND);
        payloads.password = saltPass;
    }
    else {
        const saltPass = yield bcrypt_1.default.hash(payloads.password, role_1.PAYLOADS.PASSWORD_SALT_ROUND);
        payloads.password = saltPass;
    }
    // Transaction
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const existingEmail = yield tx.user.findUnique({
            where: { email: payloads.email },
        });
        if (existingEmail) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Email already exists.');
        }
        // Check if phone number already exists
        const existingPhoneNo = yield tx.user.findUnique({
            where: { phoneNo: payloads.phoneNo },
        });
        if (existingPhoneNo) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Phone number already exists.');
        }
        if (payloads.role && payloads.role === role_1.ENUM_USER_ROLE.SUPER_ADMIN) {
            const supperAdmin = yield tx.user.findFirst({
                where: { role: payloads.role },
            });
            if (supperAdmin) {
                throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'A super admin already exists in this application. Only one super admin is allowed.');
            }
        }
        const result = yield tx.user.create({ data: payloads });
        return result;
    }));
});
// get all user
const GetAllCreateUserService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // filters
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // SearchTerms
    if (searchTerm) {
        andConditions.push({
            OR: users_constant_1.userFilterableKey.map(filed => ({
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
    const { page, limit, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.user.findMany({
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
            purchases: true,
            sells: true,
            customerPayment: true,
            supplierPayment: true,
        },
    });
    const total = yield prisma_1.default.user.count();
    return {
        meta: { limit, page, total },
        data: result,
    };
});
// updated user
const UpdateUserService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid user.');
    }
    return prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const existingEmail = yield tx.user.findUnique({
            where: { email: payloads.email },
        });
        if (existingEmail) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Email already exists.');
        }
        // Check if phone number already exists
        const existingPhoneNo = yield tx.user.findUnique({
            where: { phoneNo: payloads.phoneNo },
        });
        if (existingPhoneNo) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, 'Phone number already exists.');
        }
        if (payloads.role && payloads.role === role_1.ENUM_USER_ROLE.SUPER_ADMIN) {
            const superAdmin = yield tx.user.findFirst({
                where: { role: payloads.role },
            });
            if (superAdmin) {
                throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'A super admin already exists in this application. Only one super admin is allowed.');
            }
        }
        const result = yield tx.user.update({ where: { id: id }, data: payloads });
        return result;
    }));
});
// delete user
const DeleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({ where: { id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid user.');
    }
    if (isExist.role === role_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Deletion of the super admin is not permitted.');
    }
    const deleteUser = yield prisma_1.default.user.delete({ where: { id } });
    return deleteUser;
});
// get single user by unique id
const GetSingleUserByUniqueIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({
        where: { uniqueId: id },
        include: {
            purchases: true,
            sells: true,
            customerPayment: true,
            supplierPayment: true,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid user.');
    }
    return isExist;
});
// get single user by unique id
const GetSingleUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findFirst({
        where: { id },
        include: {
            purchases: true,
            sells: true,
            customerPayment: true,
            supplierPayment: true,
        },
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid user.');
    }
    return isExist;
});
exports.UserService = {
    CreateUserService,
    GetAllCreateUserService,
    UpdateUserService,
    DeleteUserService,
    GetSingleUserByUniqueIdService,
    GetSingleUserService,
};
