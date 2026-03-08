const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();

const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const earningsRoutes = require("./routes/earnings");

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/earnings", earningsRoutes);

app.get("/", (req,res)=>{
  res.send("Rajyavani API Running");
});
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`);
});