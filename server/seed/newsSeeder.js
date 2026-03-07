const mongoose = require("mongoose");
require("dotenv").config();

const News = require("../models/News");
const Category = require("../models/Category");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

async function seedNews(){

try{

const categories = await Category.find();

if(categories.length === 0){
console.log("No categories found");
process.exit();
}

await News.deleteMany({});

const newsData = [

{
title:"महाराष्ट्रात मुसळधार पाऊस",
slug:"maharashtra-heavy-rain",
content:"महाराष्ट्रातील अनेक जिल्ह्यांमध्ये जोरदार पावसाची नोंद झाली आहे.",
category:categories[0]._id,
isBreaking:true,
isFeatured:true
},

{
title:"भारतीय क्रिकेट संघाचा विजय",
slug:"india-cricket-win",
content:"भारतीय क्रिकेट संघाने शानदार विजय मिळवला आहे.",
category:categories[3]._id,
isTrending:true
},

{
title:"तंत्रज्ञान क्षेत्रात नवीन शोध",
slug:"technology-new-startups",
content:"तंत्रज्ञान क्षेत्रात नवीन स्टार्टअप्स मोठ्या प्रमाणात उदयास येत आहेत.",
category:categories[6]._id
},

{
title:"राजकारणात मोठी घडामोड",
slug:"politics-big-update",
content:"राजकीय क्षेत्रात मोठी घडामोड घडली आहे.",
category:categories[1]._id,
isTrending:true
},

{
title:"नवीन नोकरी संधी",
slug:"new-job-opportunities",
content:"युवकांसाठी नवीन नोकरी संधी उपलब्ध झाली आहे.",
category:categories[8]._id
}

];

await News.insertMany(newsData);

console.log("Sample news inserted");

process.exit();

}catch(err){

console.log(err);
process.exit();

}

}

seedNews();