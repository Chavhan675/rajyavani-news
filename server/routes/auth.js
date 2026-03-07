const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ===============================
REGISTER USER
=============================== */

router.post("/register", async (req,res)=>{

try{

const {name,email,password} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){
return res.status(400).json({
message:"Email already registered"
});
}

const user = new User({
name,
email,
password
});

await user.save();

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({
message:"User registered",
token,
user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}
});

}catch(err){

res.status(500).json({
message:"Server error"
});

}

});

/* ===============================
LOGIN USER
=============================== */

router.post("/login", async (req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(400).json({
message:"Invalid email or password"
});
}

const isMatch = await user.comparePassword(password);

if(!isMatch){
return res.status(400).json({
message:"Invalid email or password"
});
}

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({

message:"Login successful",

token,

user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}

});

}catch(err){

res.status(500).json({
message:"Server error"
});

}

});

module.exports = router;