import express from "express"
import News from "../models/News.js"

const router = express.Router()

router.get("/", async (req,res)=>{

 try{

  const q = req.query.q || ""

  const news = await News.find({
   title: { $regex: q, $options: "i" }
  })
  .limit(20)
  .sort({ createdAt:-1 })

  res.json(news)

 }catch(err){
  res.status(500).json({message:err.message})
 }

})

export default router