import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Subscription } from '../models/subscription.model'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import sendResponse from '../utils/sendResponse'

// Create subscription plan
export const createSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const { name, price, description, emailLimit, feature, bestChoice } =
      req.body

    if (!name || price === undefined || !feature?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Required fields are missing')
    }

    const plan = await Subscription.create({
      name,
      price,
      description,
      emailLimit,
      feature,
      bestChoice,
    })

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Subscription plan created successfully',
      data: plan,
    })
  }
)

// Get all subscription plans
export const getAllSubscriptions = catchAsync(
  async (req: Request, res: Response) => {
    const plans = await Subscription.find()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plans fetched successfully',
      data: plans,
    })
  }
)

// Update subscription plan
export const updateSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const updateData = req.body

    const updated = await Subscription.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updated) {
      throw new AppError(httpStatus.NOT_FOUND, 'Subscription plan not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plan updated successfully',
      data: updated,
    })
  }
)

// Delete subscription plan
export const deleteSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const deleted = await Subscription.findByIdAndDelete(id)

    if (!deleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'Subscription plan not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plan deleted successfully',
      data: {},
    })
  }
)
