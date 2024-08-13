import express, { NextFunction, Request, Response } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { FileUploads } from '../../../helpers/fileUploader'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { SupplierController } from './supplier.controller'
import { SupplierZodSchema } from './supplier.validation'

const router = express.Router()

router.post(
  '/create-supplier',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),

  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SupplierZodSchema.CreateSupplierZodSchema.parse(
      JSON.parse(req.body.data),
    )
    return SupplierController.CreateSupplierController(req, res, next)
  },
)
router.get(
  '/',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SupplierController.GetAllSupplierController,
)

router.get(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SupplierController.GetSingleSupplierController,
)
router.patch(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  ValidateZodRequest(SupplierZodSchema.UpdateSupplierZodSchema),
  SupplierController.UpdateSupplierController,
)

router.get(
  '/get-suppliers-by-user-supplier-product/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SupplierController.GetBySuppliersByUserSupplierProductController,
)
router.get(
  '/get-by-user-id/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SupplierController.GetByUserIdController,
)

export const SupplierRoutes = router
