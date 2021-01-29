import setupRoutes from '@/main/config/routes'
import setupMiddlewares from '@/main/config/middlewares'
import setupApolloServer from '@/main/config/apollo-server'
import setupSwagger from '@/main/config/swagger'

import express from 'express'

const app = express()

setupApolloServer(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
