import express from "express"
import protect from "../middleware/auth.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
import User from "../models/User.js"
import News from "../models/News.js"
import Category from "../models/Category.js"

const router = express.Router()

router.get("/stats", protect, adminMiddleware, async (req,res)=>{
 try{

  const users = await User.countDocuments()
  const news = await News.countDocuments()
  const categories = await Category.countDocuments()

  const pendingNews = await News.countDocuments({status:"pending"})
  const publishedNews = await News.countDocuments({status:"published"})

  res.json({
   users,
   news,
   categories,
   pendingNews,
   publishedNews
  })

 }catch(error){

  res.status(500).json({message:error.message})

 }
})

router.get("/users", protect, adminMiddleware, async (req,res)=>{
 try{

  const users = await User.find().select("-password").sort({createdAt:-1})

  res.json(users)

 }catch(error){

  res.status(500).json({message:error.message})

 }
})

router.put("/users/:id/block", protect, adminMiddleware, async (req,res)=>{
 try{

  const user = await User.findById(req.params.id)

  if(!user){
   return res.status(404).json({message:"User not found"})
  }

  user.status = "blocked"

  await user.save()

  res.json({message:"User blocked"})

 }catch(error){

  res.status(500).json({message:error.message})

 }
})

router.put("/users/:id/unblock", protect, adminMiddleware, async (req,res)=>{
 try{

  const user = await User.findById(req.params.id)

  if(!user){
   return res.status(404).json({message:"User not found"})
  }

  user.status = "active"

  await user.save()

  res.json({message:"User unblocked"})

 }catch(error){

  res.status(500).json({message:error.message})

 }
})

router.get("/news/pending", protect, adminMiddleware, async (req,res)=>{
 try{

  const news = await News.find({status:"pending"})
  .populate("author","name email")
  .populate("category","name")

  res.json(news)

 }catch(error){

  res.status(500).json({message:error.message})

 }
})

router.put("/news/:id/approve", protect, adminMiddleware, async (req,res)=>{
 try{

  const news = await News.findById(req.params.id)

  if(!news){
   return res.status(404).json({message:"News not found"})
  }

  news.status = "published"

  await news.save()

  res.json({message:"News approved"})

 }catch(error){

  res.status(500).json({message:error.message})

 }
})

router.delete("/news/:id", protect, adminMiddleware, async (req,res)=>{
 try{

  const news = await News.findById(req.params.id)

  if(!news){
   return res.status(404).json({message:"News not found"})
  }

  await news.deleteOne()

  res.json({message:"News deleted by admin"})

 }catch(error){

  res.status(500).json({message:error.message})

 }
})

export default router