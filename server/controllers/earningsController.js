import Earnings from "../models/Earnings.js"
import User from "../models/User.js"

export const createEarning = async (req,res)=>{

 try{

  const {user,news,amount,source,notes} = req.body

  const earning = new Earnings({
   user,
   news,
   amount,
   source,
   notes
  })

  await earning.save()

  res.status(201).json(earning)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getUserEarnings = async (req,res)=>{

 try{

  const earnings = await Earnings.find({user:req.user._id})
  .populate("news","title slug")
  .sort({createdAt:-1})

  res.json(earnings)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getAllEarnings = async (req,res)=>{

 try{

  const earnings = await Earnings.find()
  .populate("user","name email")
  .populate("news","title slug")
  .sort({createdAt:-1})

  res.json(earnings)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const updateEarningStatus = async (req,res)=>{

 try{

  const earning = await Earnings.findById(req.params.id)

  if(!earning){
   return res.status(404).json({message:"Earning not found"})
  }

  const {status,transactionId,paymentMethod} = req.body

  earning.status = status || earning.status
  earning.transactionId = transactionId || earning.transactionId
  earning.paymentMethod = paymentMethod || earning.paymentMethod

  await earning.save()

  if(status === "paid"){
   await User.findByIdAndUpdate(earning.user,{
    $inc:{earnings:earning.amount}
   })
  }

  res.json(earning)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const deleteEarning = async (req,res)=>{

 try{

  const earning = await Earnings.findById(req.params.id)

  if(!earning){
   return res.status(404).json({message:"Earning not found"})
  }

  await earning.deleteOne()

  res.json({message:"Earning deleted"})

 }catch(error){

  res.status(500).json({message:error.message})

 }

}