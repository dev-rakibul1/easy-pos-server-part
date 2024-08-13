"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPurchaseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = require("../../middlewares/auth");
const customerPurchase_controller_1 = require("./customerPurchase.controller");
const router = express_1.default.Router();
router.get('/get-by-current-date', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), customerPurchase_controller_1.CustomerPurchaseController.GetCustomerPurchaseByCurrentDateController);
router.get('/get-purchase-by-customer-and-user/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), customerPurchase_controller_1.CustomerPurchaseController.GetCustomerPurchaseByCustomerAndUserController),
    router.get('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), customerPurchase_controller_1.CustomerPurchaseController.GetSingleCustomerPurchaseController);
router.get('/get-by-user-id/:id', 
// AuthProvider.Auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CONTENT_MANAGER,
//   ENUM_USER_ROLE.MARKETING_MANAGER,
//   ENUM_USER_ROLE.MODERATOR,
//   ENUM_USER_ROLE.USER,
// ),
customerPurchase_controller_1.CustomerPurchaseController.GetByUserIdController);
exports.CustomerPurchaseRoutes = router;
