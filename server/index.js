const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const newsRoutes = require("./routes/news")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads"))

app.get("/", (req, res) => {
  res.send("Rajyavani API running")
})

app.use("/api/news", newsRoutes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected")
})
.catch((err) => {
  console.log("MongoDB Error:", err)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})