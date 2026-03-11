import express from "express"

const router = express.Router()

/* GET ALL CATEGORIES */

router.get("/", (req,res)=>{

 const categories = [

  { name:"Maharashtra", slug:"maharashtra" },
  { name:"Politics", slug:"politics" },
  { name:"Sports", slug:"sports" },
  { name:"Technology", slug:"technology" },
  { name:"Entertainment", slug:"entertainment" },
  { name:"Business", slug:"business" },
  { name:"World", slug:"world" },
  { name:"Education", slug:"education" },
  { name:"Health", slug:"health" },
  { name:"Crime", slug:"crime" }

 ]

 res.json(categories)

})

export default router