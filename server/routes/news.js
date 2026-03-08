const express = require("express");
const router = express.Router();
const News = require("../models/News");

router.get("/", async(req,res)=>{

const news = await News
.find()
.sort({createdAt:-1})
.limit(20)
.lean();

res.json(news);

});

router.get("/category/:category", async(req,res)=>{

const news = await News
.find({category:req.params.category})
.sort({createdAt:-1})
.limit(10)
.lean();

res.json(news);

});

router.get("/:slug", async(req,res)=>{

const news = await News
.findOne({slug:req.params.slug})
.lean();

res.json(news);

});

module.exports = router;