const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');


// it is used to create the cookie or token and for following request
 passport.serializeUser((user,done)=>{
   done(null,user.id)
});

passport.deserializeUser((id,done)=>{
  User.findById(id)
  .then(user =>{
     done(null,user)
  })
});

 
passport.use("authentication",new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
 }, async (accessToken,refreshToken,profile,done)=>{
   
   const existingUser = await User.findOne({googleId:profile.id})
     
    if(existingUser)
      {
         done(null,existingUser)
      }
      else{
        return done(null,false); 
      }  
      
   })) 

 
   passport.use("registration",new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/register/callback',
    proxy:true
   },async (accessToken,refreshToken,profile,done)=>{
       
    const existingUser = await User.findOne({googleId:profile.id})

     if(!existingUser)
     {
      const user = await new User({googleId:profile.id}).save();
       done(null,user);
     
     }
     else
     {
       done(null,false);
     }
   })) 
 
       
