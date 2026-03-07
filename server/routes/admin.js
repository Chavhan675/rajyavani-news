const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const News = require("../models/News");
const User = require("../models/User");
const Category = require("../models/Category");

const auth = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");

/* ===============================
UPLOAD CONFIG
=============================== */

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/");
},

filename:function(req,file,cb){
cb(null,Date.now() + path.extname(file.originalname));
}

});

const upload = multer({storage});

/* ===============================
ADMIN STATS
=============================== */

router.get("/stats",auth,adminMiddleware,async(req,res)=>{

try{

const totalNews = await News.countDocuments();
const totalUsers = await User.countDocuments();
const totalCategories = await Category.countDocuments();

res.json({
totalNews,
totalUsers,
totalCategories
});

}catch(err){

res.status(500).json({message:"Server error"});

}

});

/* ===============================
ALL NEWS (ADMIN)
=============================== */

router.get("/news",auth,adminMiddleware,async(req,res)=>{

try{

const news = await News.find()
.populate("category","name")
.populate("author","name")
.sort({createdAt:-1});

res.json(news);

}catch(err){

res.status(500).json({message:"Server error"});

}

});

/* ===============================
CREATE NEWS
=============================== */

router.post("/create-news",
auth,
adminMiddleware,
upload.single("image"),
async(req,res)=>{

try{

const {title,content,category} = req.body;

const news = new News({

title,
content,
category,
image:req.file ? req.file.filename : "",
author:req.user._id,
status:"published"

});

await news.save();

res.json({
message:"News created successfully"
});

}catch(err){

res.status(500).json({message:"Server error"});

}

});

/* ===============================
DELETE NEWS
=============================== */

router.delete("/news/:id",auth,adminMiddleware,async(req,res)=>{

try{

await News.findByIdAndDelete(req.params.id);

res.json({
message:"News deleted"
});

}catch(err){

res.status(500).json({message:"Server error"});

}

});

/* ===============================
UPDATE NEWS
=============================== */

router.put("/news/:id",
auth,
adminMiddleware,
upload.single("image"),
async(req,res)=>{

try{

const {title,content,category} = req.body;

const updateData = {

title,
content,
category

};

if(req.file){
updateData.image = req.file.filename;
}

await News.findByIdAndUpdate(req.params.id,updateData);

res.json({
message:"News updated"
});

}catch(err){

res.status(500).json({message:"Server error"});

}

});

module.exports = router;