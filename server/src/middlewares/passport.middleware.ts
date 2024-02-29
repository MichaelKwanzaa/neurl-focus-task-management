import passport from 'passport'
import LocalStrategy from 'passport-local'
import { User } from '../models';
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default function PassportMiddleware (){
    passport.serializeUser((user, done) => {
        done(null, user['_id']);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email', // Specify the field used for email login
        passwordField: 'password'
      }, async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Incorrect email or password' });
          }
      
          const isMatch = await bcrypt.compare(password, user.password);
      
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
          }
      
          return done(null, user); // Successful login
        } catch (error) {
          return done(error); // Handle any errors during authentication
        }
      }));
      
      passport.use(new GoogleStrategy({
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: process.env.CLIENT_REDIRECT_URI,
        }, async (accessToken, refreshToken, profile, done) => {
          try {
            // Find or create the user based on Google profile information
            const user = await User.findOneAndUpdate(
              { email: profile.emails[0].value },
              {
                $setOnInsert: {
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  picture: profile.photos[0].value, // Optional: store profile picture
                },
              },
              { upsert: true, new: true }
            );
        
            return done(null, user); // Successful login
          } catch (error) {
            return done(error); // Handle any errors during authentication
          }
        }));
}

