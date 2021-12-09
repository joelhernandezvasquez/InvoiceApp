
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require("passport");
const keys = require("./config/keys");
const flash = require("connect-flash");

require('./models/User');
require('./models/Invoice');
require('./models/Customer');
require("./services/passport");

const dashboardRoute = require('./routes/dashboardRoute');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const invoiceRoute = require('./routes/invoiceRoute');
const customerRoute = require('./routes/customerRoute');

mongoose.connect(keys.mongoURI,{
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
});



const app = express();
app.use(express.json({extended:false}));

app.use(
   cookieSession({
      maxAge:30 * 24 * 60 * 60 * 1000, // means that will expire in 30 days and need to be pass as miliseconds
      keys:[keys.cookieKey]
   })
)

app.use(passport.initialize());
app.use(passport.session());


app.use('uploads',express.static('uploads'))

app.use(flash())

authRoutes(app);
userRoutes(app);
dashboardRoute(app);
invoiceRoute(app);
customerRoute(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT);
