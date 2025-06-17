import express from 'express'
import {
  createAgent,
  deleteAgent,
  getAllAgents,
  updateAgent,
} from '../controllers/agent.controller'

const router = express.Router()

router.post('/agents/create', createAgent)
router.get('/agents', getAllAgents)
router.patch('/agents/:id', updateAgent)
router.delete('/agents/:id', deleteAgent)

export default router
