import express from 'express'
import * as dotenv from 'dotenv'
import { env } from 'process'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes/Routes'
import { connectDB } from './config'
dotenv.config()

const app: express.Application = express()
const server = http.createServer(app)
const PORT = env.PORT

try {
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
  }))
  app.use(express.json())
  app.use(helmet())
  app.use(morgan('dev'))

  void connectDB()

  app.use(routes)

  const expressServer = server.listen(PORT, (): void => {
    console.clear()
    console.log(`Server is running on port: ${PORT}`)
  })

  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at: ', promise, 'reason: ', reason)
    expressServer.close(() => process.exit(1))
  })
} catch (error: any) {
  console.log(error.message, ' - index.ts error')
}