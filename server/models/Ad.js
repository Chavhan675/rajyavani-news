import mongoose from "mongoose"

const adSchema = new mongoose.Schema({

 title:{
  type:String,
  required:true
 },

 image:{
  type:String,
  required:true
 },

 link:{
  type:String,
  required:true
 },

 position:{
  type:String,
  enum:["top","sidebar","between","footer"],
  required:true
 },

 clicks:{
  type:Number,
  default:0
 }

},{timestamps:true})

export default mongoose.model("Ad",adSchema)