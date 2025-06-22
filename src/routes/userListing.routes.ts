import express from 'express'
import {
  createUserListing,
  updateUserListing,
  getListingsByUserId,
  getSingleListingById,
} from '../controllers/userListing.controller'
import { protect } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/user-listings', protect, createUserListing)
router.put('/user-listings/:id', protect, updateUserListing)
router.get('/user-listings/:userId',protect, getListingsByUserId)
router.get('/user-listings/:id', protect, getSingleListingById)

export default router
