import mongoose from "mongoose"
import dotenv from "dotenv"
import News from "../models/News.js"
import Category from "../models/Category.js"
import User from "../models/User.js"

dotenv.config()

const seedNews = async () => {

 try{

  await mongoose.connect(process.env.MONGO_URI)

  const category = await Category.findOne()

  const user = await User.findOne()

  if(!category || !user){
   console.log("Need category and user before seeding news")
   process.exit()
  }

  const newsData = [
   {
    title:"महाराष्ट्रात मुसळधार पाऊस",
    description:"Heavy rainfall across Maharashtra",
    content:"Maharashtra experienced heavy rainfall today across several districts.",
    category:category._id,
    author:user._id,
    status:"published",
    location:"Pune",
    tags:["rain","maharashtra"]
   },
   {
    title:"भारताने सामना जिंकला",
    description:"India wins thrilling cricket match",
    content:"India defeated Australia in a thrilling cricket match.",
    category:category._id,
    author:user._id,
    status:"published",
    location:"Mumbai",
    tags:["cricket","india"]
   }
  ]

  await News.deleteMany()

  await News.insertMany(newsData)

  console.log("News seeded successfully")

  process.exit()

 }catch(error){

  console.error(error)

  process.exit(1)

 }

}

seedNews()