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
  '/get-by-current-date',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  PurchaseController.GetAllPurchaseByCurrentDateController,
)
router.get(
  '/get-by-current-week',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  PurchaseController.GetAllPurchaseByCurrentWeekController,
)
router.get(
  '/get-by-current-month',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  PurchaseController.GetAllPurchaseByCurrentMonthController,
)
router.get(
  '/get-by-current-year',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  PurchaseController.GetAllPurchaseByCurrentYearController,
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
router.get(
  '/get-by-supplier-and-user/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PurchaseController.GetBySupplierAndUserPurchaseController,
)
router.get(
  '/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PurchaseController.GetSinglePurchaseController,
)

export const PurchaseRoutes = router
