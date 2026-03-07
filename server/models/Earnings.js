const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

news:{
type:mongoose.Schema.Types.ObjectId,
ref:"News",
required:true
},

newsTitle:{
type:String
},

amount:{
type:Number,
required:true,
default:0
},

type:{
type:String,
enum:["view_income","bonus","manual"],
default:"view_income"
},

status:{
type:String,
enum:["pending","paid"],
default:"pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

/* ===============================
INDEX FOR FAST QUERY
=============================== */

earningsSchema.index({user:1});
earningsSchema.index({news:1});

module.exports = mongoose.model("Earnings",earningsSchema);