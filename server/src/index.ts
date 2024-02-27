import express from 'express'
import * as dotenv from 'dotenv'
import { env } from 'process'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes/Routes'
import { connectDB } from './config'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'

dotenv.config()

const app: express.Application = express()
const server = http.createServer(app)
const PORT = env.PORT

try {
  app.use(cors({
    credentials: true,
    origin: [`http://${process.env.CLIENT_URI}`]
  }))
  app.use(express.json())
  app.use(cookieParser())
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { 
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none"
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())



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