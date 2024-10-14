import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { WarrantyController } from './warranty.controller'

const router = express.Router()

router.post(
  '/create-warranty',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  WarrantyController.CreateVatController,
)

export const WarrantyRoutes = router
