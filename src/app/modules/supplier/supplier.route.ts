import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { SupplierController } from './supplier.controller'
import { SupplierZodSchema } from './supplier.validation'

const router = express.Router()

router.post(
  '/create-supplier',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  ValidateZodRequest(SupplierZodSchema.CreateSupplierZodSchema),
  SupplierController.CreateSupplierController,
)
router.get(
  '/',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SupplierController.GetAllSupplierController,
)
router.patch(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  ValidateZodRequest(SupplierZodSchema.UpdateSupplierZodSchema),
  SupplierController.UpdateSupplierController,
)

export const SupplierRoutes = router
