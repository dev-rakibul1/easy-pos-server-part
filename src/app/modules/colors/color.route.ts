import express from 'express'
import { ColorController } from './color.controller'

const router = express.Router()

router.post('/create-color', ColorController.CreateColorController)
router.get('/', ColorController.GetAllColorController)

export const ColorRoutes = router
