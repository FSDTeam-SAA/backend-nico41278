import { Request, Response } from 'express'
import { UserMessage } from '../models/userMessage.model'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import sendResponse from '../utils/sendResponse'
import mongoose from 'mongoose'

// Create a new message
export const createUserMessage = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, agentsId, userListingId, message } = req.body

    if (!userId || !agentsId || !userListingId || !message) {
      throw new AppError(httpStatus.BAD_REQUEST, 'All fields are required')
    }

    const createdMessage = await UserMessage.create({
      userId,
      agentsId,
      userListingId,
      message,
    })

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Message created successfully',
      data: createdMessage,
    })
  }
)

// Get all messages by user ID
export const getMessagesByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user ID')
    }

    const messages = await UserMessage.find({ userId }).populate([
      'agentsId',
      'userListingId',
    ])

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Messages fetched successfully',
      data: messages,
    })
  }
)

// Get single message by message ID
export const getSingleMessage = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const message = await UserMessage.findById(id).populate([
      'userId',
      'agentsId',
      'userListingId',
    ])

    if (!message) {
      throw new AppError(httpStatus.NOT_FOUND, 'Message not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message fetched successfully',
      data: message,
    })
  }
)

// Update message by ID
export const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { message } = req.body

  const updated = await UserMessage.findByIdAndUpdate(
    id,
    { message },
    { new: true, runValidators: true }
  )

  if (!updated) {
    throw new AppError(httpStatus.NOT_FOUND, 'Message not found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message updated successfully',
    data: updated,
  })
})

// Delete message by ID
export const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const deleted = await UserMessage.findByIdAndDelete(id)

  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Message not found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message deleted successfully',
    data: deleted,
  })
})
