const User = require("../models/User");

/* ===============================
ADMIN AUTH MIDDLEWARE
=============================== */

module.exports = async function(req,res,next){

try{

const userId = req.user._id;

const user = await User.findById(userId);

if(!user){
return res.status(404).json({
message:"User not found"
});
}

if(user.role !== "admin"){
return res.status(403).json({
message:"Access denied. Admin only."
});
}

next();

}catch(err){

return res.status(500).json({
message:"Server error"
});

}

};