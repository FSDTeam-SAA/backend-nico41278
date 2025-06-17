import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUserMessage extends Document {
  userId: Types.ObjectId
  agentsId: Types.ObjectId
  userListingId: Types.ObjectId
  message: string
}

const UserMessageSchema: Schema = new Schema<IUserMessage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    agentsId: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
    userListingId: {
      type: Schema.Types.ObjectId,
      ref: 'UserListing',
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

export const UserMessage = mongoose.model<IUserMessage>(
  'UserMessage',
  UserMessageSchema
)
