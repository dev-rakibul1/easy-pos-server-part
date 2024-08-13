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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const role_1 = require("../../../enums/role");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Login token
const LoginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { uniqueId, password } = payload;
    // Find the user by uniqueId
    const user = yield prisma_1.default.user.findUnique({
        where: { uniqueId },
    });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist.');
    }
    // Compare the provided password with the stored hashed password
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Your password does not match.');
    }
    // Update the user's status to true
    yield prisma_1.default.user.update({
        where: { uniqueId: user.uniqueId },
        data: { status: true },
    });
    // Generate access token
    const accessToken = jwtHelper_1.jwtTokenProvider.createToken({
        uniqueId: user === null || user === void 0 ? void 0 : user.uniqueId,
        role: user === null || user === void 0 ? void 0 : user.role,
        status: user === null || user === void 0 ? void 0 : user.status,
    }, role_1.PAYLOADS.ACCESS_TOKEN, role_1.PAYLOADS.ACCESS_TOKEN_EXPIRE_IN);
    // Generate refresh token
    const refreshToken = jwtHelper_1.jwtTokenProvider.createToken({ uniqueId: user === null || user === void 0 ? void 0 : user.uniqueId, role: user === null || user === void 0 ? void 0 : user.role, status: user === null || user === void 0 ? void 0 : user.status }, role_1.PAYLOADS.REFRESH_TOKEN, role_1.PAYLOADS.REFRESH_TOKEN_EXPIRE_IN);
    return {
        accessToken,
        refreshToken,
    };
});
// Refresh token
const RefreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = null;
    try {
        verifyToken = jwtHelper_1.jwtTokenProvider.verifyJwtToken(token, role_1.PAYLOADS.REFRESH_TOKEN);
    }
    catch (error) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token.');
    }
    const { uniqueId } = verifyToken;
    const user = yield prisma_1.default.user.findUnique({ where: { uniqueId } });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist.');
    }
    // Generate a new token
    const newAccessToken = jwtHelper_1.jwtTokenProvider.createToken({
        userId: user.uniqueId,
        role: user.role,
    }, role_1.PAYLOADS.ACCESS_TOKEN, role_1.PAYLOADS.ACCESS_TOKEN_EXPIRE_IN);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    LoginUserService,
    RefreshTokenService,
};
