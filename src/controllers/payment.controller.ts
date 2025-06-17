import { Request, Response } from 'express'
import Stripe from 'stripe'
import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import { PaymentInfo } from '../models/payment.model'
import sendResponse from '../utils/sendResponse'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil',
})

// Create payment intent
export const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { userId, price, subscriptionPlanId } = req.body

  if (!userId || !subscriptionPlanId || !price) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'userId, subscriptionPlanId, price, and type are required.'
    )
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(price * 100), // cents
    currency: 'usd',
    metadata: { userId, subscriptionPlanId },
  })

  const paymentRecord = new PaymentInfo({
    userId,
    subscriptionPlanId: subscriptionPlanId,
    price,
    transactionId: paymentIntent.id,
    paymentStatus: 'pending',
  })
  await paymentRecord.save()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentIntent created',
    data: { clientSecret: paymentIntent.client_secret },
  })
})

// Confirm payment (optional if using webhooks)
export const confirmPayment = catchAsync(
  async (req: Request, res: Response) => {
    const { paymentIntentId } = req.body

    if (!paymentIntentId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'paymentIntentId is required')
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    const status =
      paymentIntent.status === 'succeeded'
        ? 'complete'
        : paymentIntent.status === 'requires_payment_method'
        ? 'failed'
        : 'pending'

    await PaymentInfo.findOneAndUpdate(
      { transactionId: paymentIntentId },
      { paymentStatus: status },
      { new: true }
    )

    if (status === 'complete') {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment confirmed successfully',
        data: paymentIntent,
      })
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'Payment was not successful')
    }
  }
)
