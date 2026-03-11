import express from "express"
import Comment from "../models/Comment.js"

const router = express.Router()

/* GET COMMENTS */

router.get("/:newsId", async (req,res)=>{

 try{

  const comments = await Comment.find({
   newsId:req.params.newsId
  }).sort({ createdAt:-1 })

  res.json(comments)

 }catch(err){

  res.status(500).json({message:"Server error"})

 }

})

/* POST COMMENT */

router.post("/", async (req,res)=>{

 try{

  const { newsId,name,text } = req.body

  const comment = new Comment({
   newsId,
   name,
   text
  })

  await comment.save()

  res.json(comment)

 }catch(err){

  res.status(500).json({message:"Server error"})

 }

})

export default router