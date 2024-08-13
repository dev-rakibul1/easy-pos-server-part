"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierSellRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = require("../../middlewares/auth");
const supplierSell_controller_1 = require("./supplierSell.controller");
const router = express_1.default.Router();
router.post('/create-supplier-sell', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), supplierSell_controller_1.SupplierSellController.CreateSupplierSellController);
router.get('/', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), supplierSell_controller_1.SupplierSellController.GetAllSupplierSellController);
router.get('/get-by-user/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), supplierSell_controller_1.SupplierSellController.GetSupplierSellByUserIdController);
router.get('/get-sell-by-supplier-and-user/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), supplierSell_controller_1.SupplierSellController.GetSupplierSellBySupplierAndUserController);
router.get('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), supplierSell_controller_1.SupplierSellController.GetSingleSupplierSellController);
exports.SupplierSellRoutes = router;
