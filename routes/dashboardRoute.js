
// @route   GET /api/dashboard
// @desc     determine if user can get to the route
  // @access  Public
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) =>{
  
    app.get('/api/dashboard',requireLogin,(req,res)=>{
        res.send(200); 
    })
};