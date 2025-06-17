import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISubscriptionFeature {
  name: string
  isActive: boolean
}

export interface ISubscription extends Document {
  name: string
  price: number
  description: string
  emailLimit: number
  feature: ISubscriptionFeature[]
  bestChoice: boolean
}

const SubscriptionSchema: Schema = new Schema<ISubscription>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    emailLimit: { type: Number },
    feature: [
      {
        name: { type: String, required: true },
        isActive: { type: Boolean, default: true },
      },
    ],
    bestChoice: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Subscription = mongoose.model<ISubscription>(
  'Subscription',
  SubscriptionSchema
)
