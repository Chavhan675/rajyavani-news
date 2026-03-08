const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async(req,res)=>{

const {name,email,password} = req.body;

const hash = await bcrypt.hash(password,10);

const user = await User.create({
name,
email,
password:hash
});

res.json(user);

});

router.post("/login", async(req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user) return res.status(401).json({error:"Invalid login"});

const valid = await bcrypt.compare(password,user.password);

if(!valid) return res.status(401).json({error:"Invalid login"});

const token = jwt.sign(
{id:user._id,role:user.role},
process.env.JWT_SECRET
);

res.json({token});

});

module.exports = router;