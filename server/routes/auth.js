import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

/* ==========================
   REGISTER
========================== */

router.post("/register", async (req,res)=>{

 try{

  const { name,email,password } = req.body

  const existingUser = await User.findOne({ email })

  if(existingUser){
   return res.status(400).json({ message:"User already exists" })
  }

  const hashedPassword = await bcrypt.hash(password,10)

  const newUser = new User({
   name,
   email,
   password:hashedPassword
  })

  await newUser.save()

  res.json({ message:"Registration successful" })

 }catch(err){

  console.error(err)
  res.status(500).json({ message:"Server error" })

 }

})

/* ==========================
   LOGIN
========================== */

router.post("/login", async (req,res)=>{

 try{

  const { email,password } = req.body

  const user = await User.findOne({ email })

  if(!user){
   return res.status(400).json({ message:"User not found" })
  }

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
   return res.status(400).json({ message:"Invalid password" })
  }

  const token = jwt.sign(
   { id:user._id },
   process.env.JWT_SECRET,
   { expiresIn:"7d" }
  )

  res.json({
   token,
   user:{
    id:user._id,
    name:user.name,
    email:user.email
   }
  })

 }catch(err){

  console.error(err)
  res.status(500).json({ message:"Server error" })

 }

})

export default router