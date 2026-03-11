import express from "express"
import News from "../models/News.js"
import upload from "../middleware/upload.js"

const router = express.Router()

/* =========================
   GET ALL NEWS
========================= */

router.get("/", async (req,res)=>{

 try{

  const news = await News
   .find()
   .populate("category")
   .sort({ createdAt:-1 })

  res.json(news)

 }catch(err){

  res.status(500).json({ message:err.message })

 }

})

/* =========================
   GET TRENDING NEWS
========================= */

router.get("/trending/list", async (req,res)=>{

 try{

  const news = await News
   .find()
   .sort({ views:-1 })
   .limit(10)

  res.json(news)

 }catch(err){

  res.status(500).json({ message:err.message })

 }

})
router.get("/slug/:slug",async(req,res)=>{

 try{

  const news = await News.findOne({
   slug:req.params.slug
  })

  if(!news){

   return res.status(404).json({
    message:"News not found"
   })

  }

  news.views += 1

  await news.save()

  res.json(news)

 }catch(err){

  res.status(500).json({
   message:err.message
  })

 }

})

/* =========================
   GET NEWS BY CATEGORY
========================= */

router.get("/category/:category", async (req,res)=>{

 try{

  const news = await News
   .find({ category:req.params.category })
   .sort({ createdAt:-1 })

  res.json(news)

 }catch(err){

  res.status(500).json({ message:err.message })

 }

})

/* =========================
   CREATE NEWS
========================= */

router.post("/", upload.single("image"), async (req,res)=>{

 try{

  const { title,content,category } = req.body

  const image = req.file ? req.file.filename : null

  const slug = title
   .toLowerCase()
   .replace(/[^a-z0-9]+/g,"-")
   .replace(/(^-|-$)/g,"")

  const news = new News({

   title,
   content,
   category,
   image,
   slug,
   views:0

  })

  await news.save()

  /* SOCKET BREAKING NEWS */

  const io = req.app.get("io")

  if(io){

   io.emit("breaking-news",news)

  }

  res.json(news)

 }catch(err){

  res.status(500).json({ message:err.message })

 }

})

/* =========================
   GET SINGLE NEWS BY ID
========================= */

router.get("/:id", async (req,res)=>{

 try{

  const news = await News.findById(req.params.id)

  if(!news){

   return res.status(404).json({
    message:"News not found"
   })

  }

  news.views += 1

  await news.save()

  res.json(news)

 }catch(err){

  res.status(500).json({ message:err.message })

 }

})

/* =========================
   UPDATE NEWS
========================= */

router.put("/:id", upload.single("image"), async (req,res)=>{

 try{

  const { title,content,category } = req.body

  const updateData = {

   title,
   content,
   category

  }

  if(req.file){

   updateData.image = req.file.filename

  }

  const news = await News.findByIdAndUpdate(

   req.params.id,
   updateData,
   { new:true }

  )

  res.json(news)

 }catch(err){

  res.status(500).json({ message:err.message })

 }

})

/* =========================
   DELETE NEWS
========================= */

router.delete("/:id", async (req,res)=>{

 try{

  await News.findByIdAndDelete(req.params.id)

  res.json({
   message:"News deleted"
  })

 }catch(err){

  res.status(500).json({ message:err.message })

 }

})

export default router