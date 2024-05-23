import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserZodSchema } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  ValidateZodRequest(UserZodSchema.CreateUserZodSchema),
  UserController.CreateUserController,
)
router.get('/', UserController.GetAllUserController)
router.patch(
  '/:id',
  ValidateZodRequest(UserZodSchema.UpdateUserZodSchema),
  UserController.UpdateUserController,
)

export const UserRoutes = router
