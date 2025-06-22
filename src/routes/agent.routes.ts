import express from 'express'
import {
  createAgent,
  deleteAgent,
  getAllAgents,
  updateAgent,
} from '../controllers/agent.controller'
import { protect, isAdmin } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/agents/create', protect, isAdmin, createAgent)
router.get('/agents',protect, getAllAgents)
router.patch('/agents/:id', protect, isAdmin, updateAgent)
router.delete('/agents/:id', protect, isAdmin, deleteAgent)

export default router
