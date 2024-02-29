import { type Request, type Response, type NextFunction, CookieOptions } from 'express'
import { ApiResponse } from '../utils/ApiResponse.util'
import { signJwt } from '../utils/jwt.util';
import { createSession } from '../services';

const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
};
  
const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
};


export const LoginUser = (req: Request, res: Response, next: NextFunction) => {
    console.log(res);
    
    return new ApiResponse(200, 'Login successful', {}).send(res)

    // try{

        
    // } catch(error) {

    // }
}

export const LoginUserGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const user = req.user as any

        console.log({user})

        const session = await createSession(user['_id'], req.get("user-agent") || "");

        // create an access token
        const accessToken = signJwt(
            { ...user.toJSON(), session: session._id },
            { expiresIn: process.env.ACCESSTOKENTIME } // 15 minutes
        );

        // create a refresh token
        const refreshToken = signJwt(
            { ...user.toJSON(), session: session._id },
            { expiresIn: process.env.REFRESHTOKENTIME } // 1 year
        ); 

        // set cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        res.redirect(process.env.CLIENT_URI);

    } catch(error) {
        console.log('error')
    }
}
