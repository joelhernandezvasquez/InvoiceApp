
const mongoose = require('mongoose');
const {Schema} = mongoose;

const invoiceSchema = new Schema({
    invoiceNumber:String,
    invoiceDate:Date,
    dueDate:Date,
    customer:String,
    jobDescription:String,
    itemList:[
        { 
            itemName:String,
            quantity:Number,
            price:Number,
            total:Number
         }
        ],
    status:String,
    totalAmount:Number
});

mongoose.model('invoices',invoiceSchema); 