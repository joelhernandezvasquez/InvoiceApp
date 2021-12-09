
const mongoose = require("mongoose");
const {Schema} = mongoose;

const customerSchema = new Schema({
    name:String,
    email:String,
    phoneNumber:String,
    registerDate:Date,
    amountDue:Number,
    address:{
      streetAddress:String,
      city:String,
      postCode:String,
      country:String
    },
    status:String,

});
mongoose.model('customers',customerSchema); 