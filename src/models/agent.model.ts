import mongoose, { Schema, Document } from 'mongoose'

export interface IAgent extends Document {
  name: string
  location: string
  emails: string[]
}

const AgentSchema: Schema = new Schema<IAgent>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    emails: [{ type: String, required: true }],
  },
  { timestamps: true }
)

export const Agent = mongoose.model<IAgent>('Agent', AgentSchema)
