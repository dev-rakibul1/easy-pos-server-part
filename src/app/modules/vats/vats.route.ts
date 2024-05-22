import express from 'express'
import { VatController } from './vats.controller'

const router = express.Router()

router.post('/create-vat', VatController.CreateVatController)
router.get('/', VatController.GetAllVatController)

export const VatRoutes = router
