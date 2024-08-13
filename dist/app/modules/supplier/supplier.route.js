"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const fileUploader_1 = require("../../../helpers/fileUploader");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const supplier_controller_1 = require("./supplier.controller");
const supplier_validation_1 = require("./supplier.validation");
const router = express_1.default.Router();
router.post('/create-supplier', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), fileUploader_1.FileUploads.uploads.single('file'), (req, res, next) => {
    req.body = supplier_validation_1.SupplierZodSchema.CreateSupplierZodSchema.parse(JSON.parse(req.body.data));
    return supplier_controller_1.SupplierController.CreateSupplierController(req, res, next);
});
router.get('/', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), supplier_controller_1.SupplierController.GetAllSupplierController);
router.get('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), supplier_controller_1.SupplierController.GetSingleSupplierController);
router.patch('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), (0, validateRequest_1.default)(supplier_validation_1.SupplierZodSchema.UpdateSupplierZodSchema), supplier_controller_1.SupplierController.UpdateSupplierController);
router.get('/get-suppliers-by-user-supplier-product/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), supplier_controller_1.SupplierController.GetBySuppliersByUserSupplierProductController);
router.get('/get-by-user-id/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), supplier_controller_1.SupplierController.GetByUserIdController);
exports.SupplierRoutes = router;
