const mongoose = require("mongoose");
require("dotenv").config();

const News = require("../models/News");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"));

const news = [

{
title:"Pune Metro Update",
slug:"pune-metro-update",
category:"maharashtra",
content:"Latest updates about Pune metro project.",
author:"Rajyavani"
},

{
title:"India Election News",
slug:"india-election-news",
category:"politics",
content:"Latest political updates from India.",
author:"Rajyavani"
}

];

const seedNews = async()=>{

try{

await News.deleteMany();

await News.insertMany(news);

console.log("News seeded");

process.exit();

}catch(err){

console.error(err);

process.exit(1);

}

};

seedNews();