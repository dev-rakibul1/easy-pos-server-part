import express from 'express'
import { ReturnController } from './return.controller'

const router = express.Router()

router.post('/return-product', ReturnController.CreateReturnController)
router.get('/', ReturnController.GetAllReturnController)

export const ReturnRoutes = router
