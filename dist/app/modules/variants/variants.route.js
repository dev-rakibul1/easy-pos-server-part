"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = require("../../middlewares/auth");
const variants_controller_1 = require("./variants.controller");
const router = express_1.default.Router();
router.post('/create-variant', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), variants_controller_1.VariantsController.CreateVariantsController);
router.get('/', variants_controller_1.VariantsController.GetAllVariantsController);
router.get('/last-stock-variants-count', 
// AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
variants_controller_1.VariantsController.LastStockCountController);
router.get('/:id', variants_controller_1.VariantsController.GetSingleVariantsController);
router.delete('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), variants_controller_1.VariantsController.DeleteSingleVariantsController);
exports.VariantRoutes = router;
