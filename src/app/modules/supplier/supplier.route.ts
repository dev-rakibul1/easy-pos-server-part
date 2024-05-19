import express from 'express'
import { SupplierController } from './supplier.controller'

const router = express.Router()

router.post('/create-supplier', SupplierController.CreateSupplierController)
router.get('/', SupplierController.GetAllSupplierController)

export const SupplierRoutes = router
