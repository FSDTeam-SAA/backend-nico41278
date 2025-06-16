import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUserListingEmail {
  email: string
}

export interface IUserListing extends Document {
  agentId: Types.ObjectId
  selectedEmails: IUserListingEmail[]
}

const UserListingSchema: Schema = new Schema<IUserListing>(
  {
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
