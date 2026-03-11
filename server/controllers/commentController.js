import Comment from "../models/Comment.js"

export const createComment = async (req,res)=>{

 try{

  const {news,name,message} = req.body

  const comment = new Comment({
   news,
   name,
   message,
   user:req.user ? req.user._id : null
  })

  await comment.save()

  res.status(201).json(comment)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getComments = async (req,res)=>{

 try{

  const comments = await Comment.find({news:req.params.newsId})
  .sort({createdAt:-1})

  res.json(comments)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}