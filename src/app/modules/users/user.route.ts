import express, { NextFunction, Request, Response } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { FileUploads } from '../../../helpers/fileUploader'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserZodSchema } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  // AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // @ts-ignore
  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserZodSchema.CreateUserZodSchema.parse(
      JSON.parse(req.body.data),
    )
    return UserController.CreateUserController(req, res, next)
  },
)

router.get(
  '/',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.MODERATOR,
  // ),
  UserController.GetAllUserController,
)
router.patch(
  '/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ValidateZodRequest(UserZodSchema.UpdateUserZodSchema),
  UserController.UpdateUserController,
)
router.delete(
  '/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.DeleteUserController,
)
router.get(
  '/:id',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.MODERATOR,
  //   ENUM_USER_ROLE.USER,
  // ),
  UserController.GetSingleUserByUniqueIdController,
)
router.get(
  '/single-user-by-id/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  UserController.GetSingleUserController,
)

export const UserRoutes = router
