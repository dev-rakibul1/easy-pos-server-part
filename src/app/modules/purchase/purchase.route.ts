import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { PurchaseController } from './purchase.controller'
import { PurchaseZodSchema } from './purchase.validation'

const router = express.Router()

router.post(
  '/create-purchase',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ValidateZodRequest(PurchaseZodSchema.CreatePurchaseZodSchema),
  PurchaseController.CreatePurchaseController,
)
router.get(
  '/',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  PurchaseController.GetAllPurchaseController,
)
router.patch(
  '/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ValidateZodRequest(PurchaseZodSchema.UpdatePurchaseZodSchema),
  PurchaseController.UpdatePurchaseController,
)

export const PurchaseRoutes = router
