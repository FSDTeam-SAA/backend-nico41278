import express from 'express'
import {
  createPayment,
  confirmPayment,
} from '../controllers/payment.controller'

const router = express.Router()

router.post('/payment/create-payment', createPayment)
router.post('/payment/confirm-payment', confirmPayment)

export default router
