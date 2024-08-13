"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const fileUploader_1 = require("../../../helpers/fileUploader");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-user', 
// AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
fileUploader_1.FileUploads.uploads.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserZodSchema.CreateUserZodSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.CreateUserController(req, res, next);
});
router.get('/', 
// AuthProvider.Auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.MODERATOR,
// ),
user_controller_1.UserController.GetAllUserController);
router.patch('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserZodSchema.UpdateUserZodSchema), user_controller_1.UserController.UpdateUserController);
router.delete('/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.DeleteUserController);
router.get('/:id', 
// AuthProvider.Auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CONTENT_MANAGER,
//   ENUM_USER_ROLE.MARKETING_MANAGER,
//   ENUM_USER_ROLE.MODERATOR,
//   ENUM_USER_ROLE.USER,
// ),
user_controller_1.UserController.GetSingleUserByUniqueIdController);
router.get('/single-user-by-id/:id', auth_1.AuthProvider.Auth(role_1.ENUM_USER_ROLE.SUPER_ADMIN, role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CONTENT_MANAGER, role_1.ENUM_USER_ROLE.MARKETING_MANAGER, role_1.ENUM_USER_ROLE.MODERATOR, role_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.GetSingleUserController);
exports.UserRoutes = router;
