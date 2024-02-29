import express from 'express'
import { LoginUser, LoginUserGoogle } from '../controllers'
import passport from 'passport'


const router = express.Router()

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), LoginUser)

router.get('/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] })); 

router.get('/oauth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), LoginUserGoogle);


export { router as AuthenticationRoute } 