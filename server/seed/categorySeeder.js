import mongoose from "mongoose"
import dotenv from "dotenv"
import Category from "../models/Category.js"

dotenv.config()

const categories = [
 { name:"महाराष्ट्र", description:"Maharashtra news", featured:true },
 { name:"राजकारण", description:"Political news", featured:true },
 { name:"क्रिकेट", description:"Cricket updates", featured:true },
 { name:"तंत्रज्ञान", description:"Technology news" },
 { name:"मनोरंजन", description:"Entertainment news" },
 { name:"व्यवसाय", description:"Business news" },
 { name:"शिक्षण", description:"Education news" },
 { name:"आरोग्य", description:"Health news" }
]

const seedCategories = async () => {

 try{

  await mongoose.connect(process.env.MONGO_URI)

  await Category.deleteMany()

  await Category.insertMany(categories)

  console.log("Categories seeded successfully")

  process.exit()

 }catch(error){

  console.error(error)

  process.exit(1)

 }

}

seedCategories()