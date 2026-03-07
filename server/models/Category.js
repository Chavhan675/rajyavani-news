const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

name:{
type:String,
required:true,
unique:true,
trim:true
},

slug:{
type:String,
unique:true
},

description:{
type:String,
default:""
},

icon:{
type:String,
default:""
},

order:{
type:Number,
default:0
},

isActive:{
type:Boolean,
default:true
},

createdAt:{
type:Date,
default:Date.now
}

});

/* AUTO SLUG */

categorySchema.pre("save", function(next){

if(this.name){

this.slug = this.name
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/(^-|-$)/g,"");

}

next();

});

module.exports = mongoose.model("Category", categorySchema);