import express from 'express'
import {
  createSubscription,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
} from '../controllers/subscription.controller'

const router = express.Router()

router.post('/subscriptions/create', createSubscription)
router.get('/subscriptions', getAllSubscriptions)
router.patch('/subscriptions/:id', updateSubscription)
router.delete('/subscriptions/:id', deleteSubscription)

export default router
