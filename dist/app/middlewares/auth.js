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
exports.AuthProvider = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_1 = require("../../enums/role");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const Auth = (...requireRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(http_status_1.default.UNAUTHORIZED).json({
            message: 'You are not authorized',
        });
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded) {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token');
        }
        const isTokenExpired = (decoded) => {
            const currentTime = Math.floor(Date.now() / 1000);
            return currentTime > decoded.exp;
        };
        if (isTokenExpired(decoded)) {
            yield prisma_1.default.user.update({
                where: { uniqueId: decoded.uniqueId },
                data: { status: false },
            });
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Token is expired. Please log in again.');
        }
        // Verify token
        const verifyUser = jwtHelper_1.jwtTokenProvider.verifyJwtToken(token, role_1.PAYLOADS.ACCESS_TOKEN);
        req.user = verifyUser;
        if (requireRole.length && !requireRole.includes(verifyUser.role)) {
            throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden user');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.AuthProvider = {
    Auth,
};
