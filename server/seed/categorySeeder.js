const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("../models/Category");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

async function seedCategories(){

try{

await Category.deleteMany({});

const categories = [

{
name:"महाराष्ट्र",
slug:"maharashtra"
},

{
name:"राजकारण",
slug:"politics"
},

{
name:"गुन्हे",
slug:"crime"
},

{
name:"क्रीडा",
slug:"sports"
},

{
name:"मनोरंजन",
slug:"entertainment"
},

{
name:"व्यवसाय",
slug:"business"
},

{
name:"तंत्रज्ञान",
slug:"technology"
},

{
name:"शिक्षण",
slug:"education"
},

{
name:"नोकरी",
slug:"jobs"
}

];

await Category.insertMany(categories);

console.log("Categories inserted successfully");

process.exit();

}catch(err){

console.log(err);
process.exit();

}

}

seedCategories();