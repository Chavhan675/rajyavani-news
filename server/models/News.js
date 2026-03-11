import mongoose from "mongoose"

const newsSchema = new mongoose.Schema({

 title:{
  type:String,
  required:true
 },

 content:{
  type:String,
  required:true
 },

 category:{
  type:String,
  required:true
 },

 image:{
  type:String
 },

 slug:{
  type:String,
  unique:true
 },

 views:{
  type:Number,
  default:0
 }

},{ timestamps:true })

export default mongoose.model("News",newsSchema)