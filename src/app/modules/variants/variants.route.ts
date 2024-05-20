import express from 'express'
import { VariantsController } from './variants.controller'

const router = express.Router()

router.post('/create-variant', VariantsController.CreateVariantsController)
router.get('/', VariantsController.GetAllVariantsController)
router.delete('/:id', VariantsController.DeleteSingleVariantsController)

export const VariantRoutes = router
