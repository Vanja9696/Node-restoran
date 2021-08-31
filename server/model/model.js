const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true

    },
    adress:{
        type:String,
        required: true
    },
    token:{
        type:String
    },

});
var products_schema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    price:{
        type:Number,
        required: true,
    },
    quantity:{
        type: Number,
        required:true,
        min:[1,'Quantity can nott be less then one']
    },
    availabillity: String
})

var CartSchema=new mongoose.Schema({
    items:[products_schema],
    subTotal:{
        default:0,
        type:Number
    }
},{
    timestamps:true
})

const Productdb=mongoose.model('productdb', products_schema);
const Userdb = mongoose.model('userdb', schema);
const Basketdb= mongoose.model('basketdb',CartSchema )
module.exports={
    Productdb, Userdb, Basketdb
}