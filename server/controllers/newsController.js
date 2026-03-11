import News from "../models/News.js"
import Category from "../models/Category.js"
import User from "../models/User.js"

export const createNews = async (req,res)=>{

 try{

  const {title,description,content,category,tags,location,status} = req.body

  const image = req.file ? req.file.filename : ""

  const news = new News({
   title,
   description,
   content,
   category,
   tags:tags ? tags.split(",") : [],
   image,
   location,
   status:status || "pending",
   author:req.user._id
  })

  await news.save()

  await Category.findByIdAndUpdate(category,{
   $inc:{newsCount:1}
  })

  await User.findByIdAndUpdate(req.user._id,{
   $inc:{newsCount:1}
  })

  const io = req.app.get("io")
  if(io){
   io.emit("newsCreated",news)
  }

  res.status(201).json(news)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getAllNews = async (req,res)=>{

 try{

  const page = Number(req.query.page) || 1
  const limit = 10
  const skip = (page-1)*limit

  const query = {status:"published"}

  const news = await News.find(query)
  .populate("category","name slug")
  .populate("author","name")
  .sort({createdAt:-1})
  .skip(skip)
  .limit(limit)

  res.json(news)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getSingleNews = async (req,res)=>{

 try{

  const news = await News.findOne({slug:req.params.slug})
  .populate("category","name slug")
  .populate("author","name")

  if(!news){
   return res.status(404).json({message:"News not found"})
  }

  news.views += 1
  await news.save()

  res.json(news)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const updateNews = async (req,res)=>{

 try{

  const news = await News.findById(req.params.id)

  if(!news){
   return res.status(404).json({message:"News not found"})
  }

  if(req.user.role !== "admin" && news.author.toString() !== req.user._id.toString()){
   return res.status(403).json({message:"Not allowed"})
  }

  const {title,description,content,category,status,tags} = req.body

  news.title = title || news.title
  news.description = description || news.description
  news.content = content || news.content
  news.category = category || news.category
  news.status = status || news.status

  if(tags){
   news.tags = tags.split(",")
  }

  if(req.file){
   news.image = req.file.filename
  }

  await news.save()

  res.json(news)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const deleteNews = async (req,res)=>{

 try{

  const news = await News.findById(req.params.id)

  if(!news){
   return res.status(404).json({message:"News not found"})
  }

  if(req.user.role !== "admin"){
   return res.status(403).json({message:"Admin access required"})
  }

  await news.deleteOne()

  res.json({message:"News deleted"})

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getTrendingNews = async (req,res)=>{

 try{

  const news = await News.find({status:"published"})
  .sort({views:-1})
  .limit(10)
  .populate("category","name slug")
  .populate("author","name")

  res.json(news)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}