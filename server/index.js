const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Rajyavani API running successfully")
})

app.get("/api/news", (req, res) => {
  res.json([
    {
      title: "राज्यवाणी न्यूज पोर्टल सुरू",
      content: "हे एक डेमो न्यूज आहे."
    }
  ])
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})