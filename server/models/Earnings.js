const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
userId:String,
amount:Number
},{
timestamps:true
});

module.exports = mongoose.model("Earnings",earningsSchema);