const express = require("express");
const router = express.Router();

const Earnings = require("../models/Earnings");
const News = require("../models/News");
const auth = require("../middleware/auth");

/* ===============================
GET USER EARNINGS SUMMARY
=============================== */

router.get("/",auth,async(req,res)=>{

try{

const userId = req.user._id;

const earnings = await Earnings.find({user:userId});

let total = 0;
let thisMonth = 0;
let newsCount = 0;

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

earnings.forEach(e=>{

total += e.amount;

const d = new Date(e.createdAt);

if(d.getMonth() === currentMonth && d.getFullYear() === currentYear){
thisMonth += e.amount;
}

});

const news = await News.find({author:userId});

newsCount = news.length;

res.json({
total,
thisMonth,
newsCount
});

}catch(err){

res.status(500).json({
message:"Server error"
});

}

});

/* ===============================
EARNINGS HISTORY
=============================== */

router.get("/history",auth,async(req,res)=>{

try{

const userId = req.user._id;

const history = await Earnings.find({user:userId})
.sort({createdAt:-1})
.limit(100);

res.json(history);

}catch(err){

res.status(500).json({
message:"Server error"
});

}

});

/* ===============================
ADD EARNING (SYSTEM USE)
=============================== */

router.post("/add",async(req,res)=>{

try{

const {user,news,amount,newsTitle} = req.body;

const earning = new Earnings({

user,
news,
amount,
newsTitle,
type:"view_income"

});

await earning.save();

res.json({
message:"Earning added"
});

}catch(err){

res.status(500).json({
message:"Server error"
});

}

});

module.exports = router;