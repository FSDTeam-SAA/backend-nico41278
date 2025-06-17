import express from 'express'
import {
  createPayment,
  confirmPayment,
} from '../controllers/payment.controller'

const router = express.Router()

router.post('/create-payment', createPayment)
router.post('/confirm-payment', confirmPayment)

export default router
