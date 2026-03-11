import mongoose from "mongoose"

const earningsSchema = new mongoose.Schema(
{
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
 },

 news:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"News"
 },

 amount:{
  type:Number,
  required:true,
  default:0
 },

 source:{
  type:String,
  enum:["views","ads","sponsorship","bonus"],
  default:"views"
 },

 status:{
  type:String,
  enum:["pending","approved","paid"],
  default:"pending"
 },

 transactionId:{
  type:String,
  default:""
 },

 paymentMethod:{
  type:String,
  enum:["upi","bank","wallet"],
  default:"upi"
 },

 notes:{
  type:String,
  default:""
 }

},
{
 timestamps:true
}
)

const Earnings = mongoose.model("Earnings",earningsSchema)

export default Earnings