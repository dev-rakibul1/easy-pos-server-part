import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { LoginController } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = express.Router()

router.post(
  '/login',
  ValidateZodRequest(AuthValidation.CreateLoginAuthValidation),
  LoginController.LoginUser,
)

router.post(
  '/create-refresh-token',
  ValidateZodRequest(AuthValidation.CreateRefreshTokenZodValidation),
  LoginController.RefreshToken,
)

// ----------------WEB LOGIN-------------
router.post(
  '/web-login',
  ValidateZodRequest(AuthValidation.CreateWebLoginAuthValidation),
  LoginController.WebLoginUser,
)

export const AuthRoutes = router
