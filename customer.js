let mongoose = require('mongoose')

 mongoose.connect('mongodb://localhost:27017/customer')

 let Schema = mongoose.Schema

let customerSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  pid:{
    type:Number,
    required:true
  },
  password1:{
    type:Number,
    required:true
  },
  password2:{
    type:Number,
    required:true
  }
}) 

module.exports = mongoose.model('Customers',customerSchema)