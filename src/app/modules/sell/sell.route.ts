import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { SellController } from './sell.controller'

const router = express.Router()

router.post(
  '/create-sell',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SellController.CreateSellController,
)
router.get(
  '/',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.USER,
  //   ENUM_USER_ROLE.MODERATOR,
  // ),
  SellController.GetAllSellController,
)
router.get(
  '/get-sell-by-current-date',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.GetAllSellByCurrentDateController,
)

router.get(
  '/get-sell-by-current-week',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.GetAllSellByCurrentWeekController,
)
router.get(
  '/get-sell-by-current-month',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.GetAllSellByCurrentMonthController,
)
router.get(
  '/get-sell-by-current-year',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.GetAllSellByCurrentYearController,
)
// Get by start date and end date
router.get(
  '/get-by-start-end-date',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.USER,
  //   ENUM_USER_ROLE.MODERATOR,
  // ),
  SellController.GetFilterByStartEndDateController,
)
//filter loss by start date and end date
router.get(
  '/filter-loss-by-start-end-date',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.USER,
  //   ENUM_USER_ROLE.MODERATOR,
  // ),
  SellController.GetFilterLossByStartEndDateController,
)
router.get(
  '/filter-profit-by-start-end-date',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.USER,
  //   ENUM_USER_ROLE.MODERATOR,
  // ),
  SellController.GetFilterProfitByStartEndDateController,
)
router.get(
  '/sell-get-by-customer-purchase-product-id/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.SellGetByCustomerPurchaseIdController,
)
router.get(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.GetSingleSellController,
)
router.get(
  '/warranty/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SellController.GetWarrantySellController,
)

export const SellRoutes = router
