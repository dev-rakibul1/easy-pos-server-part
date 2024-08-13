"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const purchase_controller_1 = require("./purchase.controller");
const purchase_validation_1 = require("./purchase.validation");
const router = express_1.default.Router();
router.post('/create-purchase', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(purchase_validation_1.PurchaseZodSchema.CreatePurchaseZodSchema), purchase_controller_1.PurchaseController.CreatePurchaseController);
router.get('/get-by-current-date', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.USER, role_1.ENUM_USER_ROLE.MODERATOR), purchase_controller_1.PurchaseController.GetAllPurchaseByCurrentDateController);
router.get('/get-by-current-week', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.USER, role_1.ENUM_USER_ROLE.MODERATOR), purchase_controller_1.PurchaseController.GetAllPurchaseByCurrentWeekController);
router.get('/get-by-current-month', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.USER, role_1.ENUM_USER_ROLE.MODERATOR), purchase_controller_1.PurchaseController.GetAllPurchaseByCurrentMonthController);
router.get('/get-by-current-year', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.USER, role_1.ENUM_USER_ROLE.MODERATOR), purchase_controller_1.PurchaseController.GetAllPurchaseByCurrentYearController);
router.get('/', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), purchase_controller_1.PurchaseController.GetAllPurchaseController);
router.patch('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(purchase_validation_1.PurchaseZodSchema.UpdatePurchaseZodSchema), purchase_controller_1.PurchaseController.UpdatePurchaseController);
router.get('/get-by-supplier-and-user/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), purchase_controller_1.PurchaseController.GetBySupplierAndUserPurchaseController);
router.get('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), purchase_controller_1.PurchaseController.GetSinglePurchaseController);
exports.PurchaseRoutes = router;
