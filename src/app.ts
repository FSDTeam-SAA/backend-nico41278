import express from 'express'
import userRoutes from './routes/user.routes'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import { notFound } from './middlewares/notFound'

import paymentRoutes from './routes/payment.route'
import subscriptionRoute from './routes/subscription.routes'
import newsletterRoutes from './routes/newsLetter.route'
import agentRoutes from './routes/agent.routes'
import userListingRoutes from './routes/userListing.routes'
import userMessageRoutes from './routes/userMessage.routes'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
  })
)
app.use(express.json())

app.use('/api/v1', userRoutes)
app.use('/api/v1', paymentRoutes)
app.use('/api/v1', subscriptionRoute)
app.use('/api/v1', newsletterRoutes)
app.use('/api/v1', agentRoutes)
app.use('/api/v1', userListingRoutes)
app.use('/api/v1', userMessageRoutes)

app.use(notFound as never)
app.use(globalErrorHandler)

export default app
