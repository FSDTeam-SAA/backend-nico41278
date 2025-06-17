import mongoose, { Document, Schema } from 'mongoose'

export interface IPaymentInfo extends Document {
  userId: mongoose.Types.ObjectId
  subscriptionPlanId?: mongoose.Types.ObjectId
  price: number
  paymentStatus: 'complete' | 'pending' | 'failed'
  seasonId?: string
  transactionId: string
}

const paymentInfoSchema: Schema<IPaymentInfo> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionPlanId: { type: mongoose.Types.ObjectId, ref: 'Order' },
    price: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['complete', 'pending', 'failed'],
      default: 'pending',
    },
    seasonId: { type: String },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
)

export const PaymentInfo = mongoose.model<IPaymentInfo>(
  'PaymentInfo',
  paymentInfoSchema
)
