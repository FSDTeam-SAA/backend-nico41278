import express from 'express'
import {
  createSubscription,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
} from '../controllers/subscription.controller'
import { isAdmin, protect } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/subscriptions/create', protect, isAdmin, createSubscription)
router.get('/subscriptions', getAllSubscriptions)
router.patch('/subscriptions/:id', protect, isAdmin, updateSubscription)
router.delete('/subscriptions/:id', protect, isAdmin, deleteSubscription)

export default router
