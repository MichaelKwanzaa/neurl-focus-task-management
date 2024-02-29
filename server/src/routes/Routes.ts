import express from 'express'
import { AuthenticationRoute, SessionRoute, UserRoute } from './index'

const router = express.Router()

router.use('/v1/api/authentication', AuthenticationRoute)
router.use('/v1/api/sessions', SessionRoute)
router.use('/v1/api/user', UserRoute)


export default router

'http://localhost:5001/v1/api/sessions/oauth/google'