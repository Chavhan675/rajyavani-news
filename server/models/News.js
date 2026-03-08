const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
title:String,
slug:{type:String,unique:true},
category:String,
image:String,
content:String,
author:String
},{
timestamps:true
});

newsSchema.index({slug:1});
newsSchema.index({category:1});
newsSchema.index({createdAt:-1});

module.exports = mongoose.model("News",newsSchema);