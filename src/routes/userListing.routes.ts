import express from 'express'
import {
  createUserListing,
  updateUserListing,
  getListingsByUserId,
  getSingleListingById,
} from '../controllers/userListing.controller'

const router = express.Router()

router.post('/user-listings', createUserListing)
router.put('/user-listings/:id', updateUserListing)
router.get('/user-listings/:userId', getListingsByUserId)
router.get('/user-listings/:id', getSingleListingById)

export default router
