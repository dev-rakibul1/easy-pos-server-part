"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const fileUploader_1 = require("../../../helpers/fileUploader");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.post('/create-product', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), fileUploader_1.FileUploads.uploads.single('file'), (req, res, next) => {
    req.body = product_validation_1.ProductZodValidation.createProductZodValidation.parse(JSON.parse(req.body.data));
    return product_controller_1.ProductsController.CreateProductsController(req, res, next);
});
router.get('/stock-in', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), product_controller_1.ProductsController.StockInProductsController);
router.get('/', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), product_controller_1.ProductsController.GetAllProductsController);
router.get('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), product_controller_1.ProductsController.GetSingleProductsController);
router.patch('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(product_validation_1.ProductZodValidation.UpdateProductZodValidation), product_controller_1.ProductsController.UpdateProductsController);
router.delete('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), product_controller_1.ProductsController.DeleteProductsController);
exports.productRoutes = router;
