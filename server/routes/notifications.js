import express from "express"
import admin from "../firebaseAdmin.js"

const router = express.Router()

router.post("/send", async (req,res)=>{

 try{

  const {title,body,token} = req.body

  const message = {

   notification:{
    title,
    body
   },

   token

  }

  await admin.messaging().send(message)

  res.json({success:true})

 }catch(err){

  res.status(500).json({error:err.message})

 }

})

export default router