
const passport = require('passport');
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) =>{

   // @route   GET /auth/google 
   // @desc    authenticate a user using google auth api
   // @access  Public
   app.get('/auth/google',passport.authenticate('authentication',{
   scope:['profile','email']
 }))

  // @route    GET /auth/google/callback
   // @desc    put the user on hold while take the user information and authenticate the user and create the cookie
   // @access  Private

 app.get('/auth/google/callback',passport.authenticate('authentication',{ failureRedirect: '/no-account-found/google-oauth2' }),
 (req,res)=>{
   res.redirect('/dashboard');
 }) 

   // @route   GET /auth/google/register 
   // @desc    check the user status whether exist or not in the database
   // @access  Public

  app.get('/auth/google/register',passport.authenticate('registration',{
   scope:['profile','email']
 }))
  
 // @route   GET /auth/google/register/callback
  // @desc    determine whether the user will be saved or not in the database
  // @access  Private
 app.get('/auth/google/register/callback',passport.authenticate('registration',{failureRedirect:'/account-found/google-oauth2'}),
 (req,res)=>{
   res.redirect('/dashboard');
 }); 
 
 
// @route   GET /api/logout
// @desc    log out the current user and destroy the cookie session
 // @access  Private
 app.get('/api/logout',requireLogin,(req,res)=>{
   req.logout();
   res.redirect("/");
 })

 // @route   GET /api/current_user 
 // @desc    return current user authenticated
 // @access  Private
 app.get('/api/current_user',requireLogin,(req,res)=>{
    res.send(req.user);
 })
}
 