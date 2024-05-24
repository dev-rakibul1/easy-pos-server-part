import express, { NextFunction, Request, Response } from 'express'
import { FileUploads } from '../../../helpers/fileUploader'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserZodSchema } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserZodSchema.CreateUserZodSchema.parse(
      JSON.parse(req.body.data),
    )
    return UserController.CreateUserController(req, res, next)
  },
)

router.get('/', UserController.GetAllUserController)
router.patch(
  '/:id',
  ValidateZodRequest(UserZodSchema.UpdateUserZodSchema),
  UserController.UpdateUserController,
)

export const UserRoutes = router
