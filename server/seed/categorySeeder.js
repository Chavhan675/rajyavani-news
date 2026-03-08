const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("../models/Category");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"));

const categories = [
{ name:"Maharashtra", slug:"maharashtra" },
{ name:"Politics", slug:"politics" },
{ name:"Sports", slug:"sports" },
{ name:"Technology", slug:"technology" }
];

const seedCategories = async()=>{

try{

await Category.deleteMany();

await Category.insertMany(categories);

console.log("Categories seeded");

process.exit();

}catch(err){

console.error(err);

process.exit(1);

}

};

seedCategories();