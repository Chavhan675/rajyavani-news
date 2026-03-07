const express = require("express")
const router = express.Router()

const News = require("../models/News")
const upload = require("../middleware/upload")

router.get("/latest", async (req,res)=>{

try{

const news = await News.find()
.sort({createdAt:-1})
.limit(10)

res.json(news)

}catch(e){

res.status(500).json({error:"Failed to fetch news"})

}

})

router.get("/trending", async (req,res)=>{

try{

const news = await News.find({isTrending:true})
.limit(10)

res.json(news)

}catch(e){

res.status(500).json({error:"Failed"})

}

})

router.get("/breaking", async (req,res)=>{

try{

const news = await News.find({isBreaking:true})
.limit(10)

res.json(news)

}catch(e){

res.status(500).json({error:"Failed"})

}

})

router.get("/:slug", async (req,res)=>{

try{

const news = await News.findOne({slug:req.params.slug})

res.json(news)

}catch(e){

res.status(500).json({error:"Failed"})

}

})

router.post("/create", upload.single("image"), async (req,res)=>{

try{

const {title,content,category} = req.body

const news = new News({

title,
content,
category,
image: req.file ? req.file.filename : null

})

await news.save()

res.json(news)

}catch(e){

res.status(500).json({error:"Create failed"})

}

})

module.exports = router