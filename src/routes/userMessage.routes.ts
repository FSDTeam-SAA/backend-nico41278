import express from 'express'
import {
  createUserMessage,
  getMessagesByUserId,
  getSingleMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/userMessage.controller'
import { protect } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/user-messages', protect, createUserMessage)
router.get('/user/messages/:userId', protect,getMessagesByUserId)
router.get('/user-messages/:id',protect, getSingleMessage)
router.put('/user-messages/:id',protect, updateMessage)
router.delete('/user-messages/:id',protect, deleteMessage)

export default router
