import express from 'express'
import userRoutes from './routes/user.routes'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import { notFound } from './middlewares/notFound'

import paymentRoutes from './routes/payment.route'
import subscriptionRoute from './routes/subscription.routes'
import newsletterRoutes from './routes/subscription.routes'
import agentRoutes from './routes/agent.routes'
import userListingRoutes from './routes/userListing.routes'


const app = express()

app.use(express.json())

app.use('/api/v1', userRoutes)
app.use('/api/v1', paymentRoutes)
app.use('/api/v1', subscriptionRoute)
app.use('/api/v1', newsletterRoutes )
app.use('/api/v1', agentRoutes)
app.use('/api/v1', userListingRoutes)



app.use(notFound as never)
app.use(globalErrorHandler)

export default app
