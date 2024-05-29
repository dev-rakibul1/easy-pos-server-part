import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { UnitController } from './unit.controller'
import { UnitZodValidation } from './unit.validation'

const router = express.Router()

router.post(
  '/create-unit',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  ValidateZodRequest(UnitZodValidation.createUnitZodValidation),
  UnitController.CreateUnitController,
)
router.get(
  '/',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  UnitController.GetAllUnitController,
)
router.get(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  UnitController.GetSingleUnitController,
)
router.patch(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  UnitController.UpdateUnitController,
)
router.delete(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  UnitController.DeleteUnitController,
)

export const UnitRoutes = router
