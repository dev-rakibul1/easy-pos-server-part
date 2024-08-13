"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app_routes_1 = __importDefault(require("./app/routes/app.routes"));
const server_1 = require("./utilities/server");
exports.app = (0, express_1.default)();
// Middleware
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
// Allows for photo access
exports.app.use('/uploads_/', express_1.default.static('uploads_'));
// Application router or Application middleware
exports.app.use('/api/v1', app_routes_1.default);
/**
 * GLOBAL ERROR HANDLING AND PRODUCTION LABEL
 */
exports.app.use(globalErrorHandler_1.default);
// global error handling
exports.app.use('*', (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not fount.',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'API not found!',
            },
        ],
    });
    next();
});
(0, server_1.databaseConnect)();
