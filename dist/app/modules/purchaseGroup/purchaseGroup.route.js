"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseGroupRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = require("../../middlewares/auth");
const purchaseGroup_controller_1 = require("./purchaseGroup.controller");
const router = express_1.default.Router();
router.get('/', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), purchaseGroup_controller_1.PurchaseGroupController.GetAllPurchaseGroupController);
router.get('/get-by-current-date', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), purchaseGroup_controller_1.PurchaseGroupController.GetAllPurchaseGroupByCurrentDateController);
router.get('/get-by-current-week', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), purchaseGroup_controller_1.PurchaseGroupController.GetAllPurchaseGroupByCurrentWeekController);
router.get('/get-by-current-month', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), purchaseGroup_controller_1.PurchaseGroupController.GetAllPurchaseGroupByCurrentMonthController);
router.get('/get-by-current-year', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), purchaseGroup_controller_1.PurchaseGroupController.GetAllPurchaseGroupByCurrentYearController);
router.get('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), purchaseGroup_controller_1.PurchaseGroupController.SinglePurchaseGroupController);
exports.PurchaseGroupRoutes = router;
