import express, { NextFunction, Request, Response } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { FileUploads } from '../../../helpers/fileUploader'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { CustomerController } from './customers.controller'
import { CustomerZodSchema } from './customers.validation'

const router = express.Router()

router.post(
  '/create-customer',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  // @ts-ignore
  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CustomerZodSchema.CreateCustomerZodSchema.parse(
      JSON.parse(req.body.data),
    )
    return CustomerController.CreateCustomerController(req, res, next)
  },
)

router.get(
  '/',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.MODERATOR,
  // ),
  CustomerController.GetAllCustomerController,
)
router.patch(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  ValidateZodRequest(CustomerZodSchema.UpdateCustomerZodSchema),
  CustomerController.UpdateCustomerController,
)
router.get(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  CustomerController.GetSingleCustomerController,
)
router.get(
  '/get-by-user-id/:id',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.MODERATOR,
  // ),
  CustomerController.GetCustomerByUserIdController,
)

export const CustomerRoutes = router
