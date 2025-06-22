import express from 'express'
import {
  createPayment,
  confirmPayment,
} from '../controllers/payment.controller'
import { protect, isAdmin } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/payment/create-payment', protect,  createPayment)
router.post('/payment/confirm-payment', protect,  confirmPayment)

export default router
