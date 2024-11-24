import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { PurchaseGroupController } from './purchaseGroup.controller'

const router = express.Router()

router.get(
  '/',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.MODERATOR,
  //   ENUM_USER_ROLE.USER,
  // ),
  PurchaseGroupController.GetAllPurchaseGroupController,
)
router.get(
  '/get-by-current-date',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  PurchaseGroupController.GetAllPurchaseGroupByCurrentDateController,
)
router.get(
  '/filter-by-start-end-date',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.MODERATOR,
  //   ENUM_USER_ROLE.USER,
  // ),
  PurchaseGroupController.GetAllPurchaseGroupByStartEndDateController,
)
router.get(
  '/get-by-current-week',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  PurchaseGroupController.GetAllPurchaseGroupByCurrentWeekController,
)
router.get(
  '/get-by-current-month',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  PurchaseGroupController.GetAllPurchaseGroupByCurrentMonthController,
)
router.get(
  '/get-by-current-year',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  PurchaseGroupController.GetAllPurchaseGroupByCurrentYearController,
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
  PurchaseGroupController.SinglePurchaseGroupController,
)

export const PurchaseGroupRoutes = router
