
// A model class basically is for creating a collection in the mongo db. A collection is the same as 
// a table in SQL relational database.

const mongoose = require('mongoose');
const {Schema} = mongoose;  // used ES6 destructuring out of const Schema = mongoose.Schema;

/*  The userSchema purpose is to define the values properties of the mongoose.Collection.
 Note: it is the same as Create table in SQL relational database. */

const userSchema = new Schema({
 googleId:String
});


/* this will create the collection in the mongo DB. 
first argument is the name of the collection
second argument is the schema define */

mongoose.model('users',userSchema); 




