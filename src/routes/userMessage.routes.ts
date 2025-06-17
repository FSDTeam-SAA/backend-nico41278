import express from 'express'
import {
  createUserMessage,
  getMessagesByUserId,
  getSingleMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/userMessage.controller'

const router = express.Router()

router.post('/user-messages', createUserMessage)
router.get('/user/messages/:userId', getMessagesByUserId)
router.get('/user-messages/:id', getSingleMessage)
router.put('/user-messages/:id', updateMessage)
router.delete('/user-messages/:id', deleteMessage)

export default router
