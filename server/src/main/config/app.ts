import setupRoutes from '@/main/config/routes'
// import { setupApolloServer } from '@/main/config/apollo-server'

import express from 'express'

const app = express()

app.use(express.json())

// setupApolloServer(app)
setupRoutes(app)

export default app
