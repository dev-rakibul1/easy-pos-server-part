import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { WarrantyController } from './warranty.controller'

const router = express.Router()

router.post(
  '/create-warranty',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  WarrantyController.CreateWarrantyController,
)
router.get(
  '/get-pending',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  WarrantyController.WarrantyGetPendingController,
)
router.get(
  '/get-delivery',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  WarrantyController.WarrantyGetDeliveryController,
)
router.get(
  '/get-single-pending/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  WarrantyController.GetSinglePendingWarrantyController,
)
router.patch(
  '/delivered/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  WarrantyController.DeliveredPendingWarrantyController,
)

export const WarrantyRoutes = router
