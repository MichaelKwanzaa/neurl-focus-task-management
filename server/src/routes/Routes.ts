import express from 'express'
import { UserRoute } from './index'

const router = express.Router()

router.use('/v1/api/user', UserRoute)

export default router