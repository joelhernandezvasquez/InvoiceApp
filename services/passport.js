const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require ('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');

const User = mongoose.model('users');

// it is used to create the cookie or token and for following request
 passport.serializeUser((user,done)=>{
  // console.log(user.id);
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
   
  const {emails} = profile; 
  const existingUser = await User.findOne({email:emails[0].value})
     
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
       
    const {emails} = profile
    const existingUser = await User.findOne({email:emails[0].value})
   
     if(!existingUser)
     {
      const user = await new User({
        email:emails[0].value, 
        name:profile.displayName,
        role:'Author',
  
      },
        )
        .save();

       done(null,user);
     }
     else
     {
       done(null,false);
     }
   }))  


   passport.use('local-registration',new LocalStrategy({usernameField:'email',passReqToCallback: true},async(req,emaile,passwore,done)=>{
    const {name,email,password,role="Author"} = req.body;
    
      try{
        const existingUser = await User.findOne({email:email});
          if(existingUser)
          {
            done(null,false);
          }
          else{
            const user =  new User({name,email,password,role})
            bcrypt.genSalt(10,(err,salt)=>
            bcrypt.hash(user.password,salt,(err,hash)=>{
              if(err) throw err;
              user.password = hash;
              user.save()
              
              .then((user =>{
                done(null,user);
              }))
          }))
        
        
       }
      }
       catch(err)
       {
        console.error(err.message)
        res.status(500).send('Server error')
       }
   }))
 
   passport.use(new LocalStrategy({usernameField:'email'}, async (email,password,done)=>{
       
    const existingUser = await User.findOne({email:email});

       if(!existingUser){
        return done(null,false);
        }

        bcrypt.compare(password,existingUser.password,(err,isMatch)=>{
          if(err) throw error;

          if(isMatch){
           return done(null,existingUser);
          }
            else{
               return done(null,false)
            }
          
        })
   }))

  

   