import { Request, Response } from 'express'
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { Agent } from '../models/agent.model'
import AppError from '../errors/AppError'
import sendResponse from '../utils/sendResponse'
import catchAsync from '../utils/catchAsync'

// Create a new agent
export const createAgent = catchAsync(async (req: Request, res: Response) => {
  const { name, location, emails } = req.body

  if (!name || !location || !emails || !emails.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'All fields are required')
  }

  const agent = await Agent.create({ name, location, emails })

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Agent created successfully',
    data: agent,
  })
})

// Get all agents with optional filtering
export const getAllAgents = catchAsync(async (req: Request, res: Response) => {
  const { name, location, email } = req.query

  const query: any = {}

  if (name) {
    query.name = { $regex: name, $options: 'i' }
  }
  if (location) {
    query.location = { $regex: location, $options: 'i' }
  }
  if (email) {
    query.emails = { $in: [new RegExp(email as string, 'i')] }
  }

  const agents = await Agent.find(query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agents retrieved successfully',
    data: agents,
  })
})

// Update agent by ID
export const updateAgent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, location, emails } = req.body

  const updatedAgent = await Agent.findByIdAndUpdate(
    id,
    { name, location, emails },
    { new: true, runValidators: true }
  )

  if (!updatedAgent) {
    throw new AppError(httpStatus.NOT_FOUND, 'Agent not found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agent updated successfully',
    data: updatedAgent,
  })
})

// Delete agent by ID
export const deleteAgent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const deleted = await Agent.findByIdAndDelete(id)

  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Agent not found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agent deleted successfully',
    data: {},
  })
})
