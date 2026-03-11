import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({

 newsId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"News",
  required:true
 },

 name:{
  type:String,
  required:true
 },

 text:{
  type:String,
  required:true
 }

},{ timestamps:true })

export default mongoose.model("Comment",commentSchema)