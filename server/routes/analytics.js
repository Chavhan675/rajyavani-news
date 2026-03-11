import express from "express"
import News from "../models/News.js"
import User from "../models/User.js"
import Comment from "../models/Comment.js"

const router = express.Router()

router.get("/dashboard",async(req,res)=>{

 try{

  const totalNews = await News.countDocuments()

  const totalUsers = await User.countDocuments()

  const totalComments = await Comment.countDocuments()

  const totalViewsData = await News.aggregate([
   {
    $group:{
     _id:null,
     views:{ $sum:"$views" }
    }
   }
  ])

  const totalViews = totalViewsData[0]?.views || 0

  const trendingNews = await News
   .find()
   .sort({ views:-1 })
   .limit(5)

  res.json({

   totalNews,
   totalUsers,
   totalComments,
   totalViews,
   trendingNews

  })

 }catch(err){

  res.status(500).json({
   message:err.message
  })

 }

})

export default router