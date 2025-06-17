import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUserListingEmail {
  email: string
}

export interface IUserListing extends Document {
  userId: Types.ObjectId
  agentId: Types.ObjectId
  selectedEmails: IUserListingEmail[]
}

const UserListingSchema: Schema = new Schema<IUserListing>(
  { 
    userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
    selectedEmails: [
      {
        email: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
)

export const UserListing = mongoose.model<IUserListing>(
  'UserListing',  
  UserListingSchema
)
