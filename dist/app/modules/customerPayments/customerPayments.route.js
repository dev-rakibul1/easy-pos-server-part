"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customerPayments_controller_1 = require("./customerPayments.controller");
const router = express_1.default.Router();
router.post('/create-customer-payment', customerPayments_controller_1.CustomerPaymentController.CreateCustomerPaymentController);
router.get('/', customerPayments_controller_1.CustomerPaymentController.GetAllCustomerPaymentController);
exports.CustomerPaymentRoutes = router;
