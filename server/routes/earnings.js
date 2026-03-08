const express = require("express");
const router = express.Router();
const Earnings = require("../models/Earnings");

router.get("/", async(req,res)=>{

const earnings = await Earnings.find();

res.json(earnings);

});

module.exports = router;