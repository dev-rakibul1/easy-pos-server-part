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
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
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
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
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

export const UserRoutes = router
