"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierPaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const supplierPayment_controller_1 = require("./supplierPayment.controller");
const router = express_1.default.Router();
router.post('/create-supplier-payment', supplierPayment_controller_1.SupplierPaymentController.CreateSupplierPaymentController);
router.get('/', supplierPayment_controller_1.SupplierPaymentController.GetAllSupplierPaymentController);
router.get('/supplier-and-user-trans/:id', supplierPayment_controller_1.SupplierPaymentController.GetSupplierAndUserTransSupplierPaymentController);
exports.SupplierPaymentRoutes = router;
