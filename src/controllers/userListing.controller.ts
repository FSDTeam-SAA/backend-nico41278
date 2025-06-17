import { Request, Response } from 'express'
import { UserListing } from '../models/userListing.model'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import sendResponse from '../utils/sendResponse'
import mongoose from 'mongoose'

// Create a new listing
export const createUserListing = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, agentId, selectedEmails } = req.body

    if (
      !userId ||
      !agentId ||
      !selectedEmails ||
      !Array.isArray(selectedEmails)
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, 'All fields are required')
    }

    const listing = await UserListing.create({
      userId,
      agentId,
      selectedEmails,
    })

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User listing created successfully',
      data: listing,
    })
  }
)

// Update a listing by ID
export const updateUserListing = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedData = req.body

    const listing = await UserListing.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    })

    if (!listing) {
      throw new AppError(httpStatus.NOT_FOUND, 'Listing not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User listing updated successfully',
      data: listing,
    })
  }
)

// Get all listings by user ID
export const getListingsByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user ID')
    }

    const listings = await UserListing.find({ userId }).populate('agentId')

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Listings fetched successfully',
      data: listings,
    })
  }
)

// Get single listing by listing ID
export const getSingleListingById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const listing = await UserListing.findById(id).populate([
      'userId',
      'agentId',
    ])

    if (!listing) {
      throw new AppError(httpStatus.NOT_FOUND, 'Listing not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Listing fetched successfully',
      data: listing,
    })
  }
)
