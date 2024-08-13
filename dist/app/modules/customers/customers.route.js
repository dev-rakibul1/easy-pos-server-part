"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const fileUploader_1 = require("../../../helpers/fileUploader");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customers_controller_1 = require("./customers.controller");
const customers_validation_1 = require("./customers.validation");
const router = express_1.default.Router();
router.post('/create-customer', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), fileUploader_1.FileUploads.uploads.single('file'), (req, res, next) => {
    req.body = customers_validation_1.CustomerZodSchema.CreateCustomerZodSchema.parse(JSON.parse(req.body.data));
    return customers_controller_1.CustomerController.CreateCustomerController(req, res, next);
});
router.get('/', 
// AuthProvider.Auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.MODERATOR,
// ),
customers_controller_1.CustomerController.GetAllCustomerController);
router.patch('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), (0, validateRequest_1.default)(customers_validation_1.CustomerZodSchema.UpdateCustomerZodSchema), customers_controller_1.CustomerController.UpdateCustomerController);
router.get('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.MODERATOR), customers_controller_1.CustomerController.GetSingleCustomerController);
router.get('/get-by-user-id/:id', 
// AuthProvider.Auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.MODERATOR,
// ),
customers_controller_1.CustomerController.GetCustomerByUserIdController);
exports.CustomerRoutes = router;
