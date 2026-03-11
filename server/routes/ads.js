import express from "express"
import Ad from "../models/Ad.js"
import upload from "../middleware/upload.js"

const router = express.Router()

/* CREATE AD */

router.post("/",upload.single("image"),async(req,res)=>{

 try{

  const {title,link,position} = req.body

  const image = req.file ? req.file.filename : null

  const ad = new Ad({
   title,
   link,
   position,
   image
  })

  await ad.save()

  res.json(ad)

 }catch(err){

  res.status(500).json({message:err.message})

 }

})

/* GET ADS */

router.get("/",async(req,res)=>{

 try{

  const ads = await Ad.find()

  res.json(ads)

 }catch(err){

  res.status(500).json({message:err.message})

 }

})

/* GET ADS BY POSITION */

router.get("/position/:position",async(req,res)=>{

 try{

  const ads = await Ad.find({
   position:req.params.position
  })

  res.json(ads)

 }catch(err){

  res.status(500).json({message:err.message})

 }

})

/* CLICK TRACK */

router.post("/click/:id",async(req,res)=>{

 try{

  const ad = await Ad.findById(req.params.id)

  ad.clicks += 1

  await ad.save()

  res.json({message:"click counted"})

 }catch(err){

  res.status(500).json({message:err.message})

 }

})

export default router