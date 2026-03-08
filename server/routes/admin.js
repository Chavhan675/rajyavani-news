const express = require("express");
const router = express.Router();
const News = require("../models/News");
const auth = require("../middleware/auth");

router.post("/news", auth, async(req,res)=>{

const news = await News.create(req.body);

res.json(news);

});

router.delete("/news/:id", auth, async(req,res)=>{

await News.findByIdAndDelete(req.params.id);

res.json({message:"Deleted"});

});

module.exports = router;