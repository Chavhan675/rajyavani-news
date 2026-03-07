const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({

title:{
type:String,
required:true,
trim:true
},

slug:{
type:String,
unique:true
},

content:{
type:String,
required:true
},

image:{
type:String
},

category:{
type:mongoose.Schema.Types.ObjectId,
ref:"Category",
required:true
},

author:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

views:{
type:Number,
default:0
},

isBreaking:{
type:Boolean,
default:false
},

isFeatured:{
type:Boolean,
default:false
},

isTrending:{
type:Boolean,
default:false
},

status:{
type:String,
enum:["pending","published"],
default:"published"
},

tags:[
{
type:String
}
],

createdAt:{
type:Date,
default:Date.now
},

updatedAt:{
type:Date,
default:Date.now
}

});

/* AUTO UPDATE TIME */

newsSchema.pre("save", function(next){

this.updatedAt = Date.now();

next();

});

/* AUTO SLUG */

newsSchema.pre("save", function(next){

if(this.title){

this.slug = this.title
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/(^-|-$)/g,"");

}

next();

});

module.exports = mongoose.model("News", newsSchema);