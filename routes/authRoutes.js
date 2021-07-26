
const passport = require('passport');

module.exports = (app) =>{


   app.get('/auth/google',passport.authenticate('authentication',{
   scope:['profile','email']
 }))

 app.get('/auth/google/callback',passport.authenticate('authentication',{ failureRedirect: '/no-account-found/google-oauth2' }),
 (req,res)=>{
     res.redirect('/dashboard');
 }) 

  app.get('/auth/google/register',passport.authenticate('registration',{
   scope:['profile','email']
 }))
  
 app.get('/auth/google/register/callback',passport.authenticate('registration',{failureRedirect:'/account-found/google-oauth2'}),
 (req,res)=>{
   res.redirect('/dashboard');
 }
 ); 
 

 app.get('/api/logout',(req,res)=>{
   req.logout();
   res.redirect("/");
 })

 app.get('/api/current_user',(req,res)=>{
    res.send(req.user);
 })
}
 