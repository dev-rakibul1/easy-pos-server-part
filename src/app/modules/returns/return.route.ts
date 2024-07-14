import express from 'express'
import { ReturnController } from './return.controller'

const router = express.Router()

router.post('/return-product', ReturnController.CreateReturnController)
router.get('/', ReturnController.GetAllReturnController)
router.get(
  '/get-by-current-date',
  ReturnController.GetAllReturnByCurrentDateController,
)
router.get(
  '/get-by-current-week',
  ReturnController.GetAllReturnByCurrentWeekController,
)
router.get(
  '/get-by-current-month',
  ReturnController.GetAllReturnByCurrentMonthController,
)

export const ReturnRoutes = router
