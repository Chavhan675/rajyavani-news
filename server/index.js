import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"

import authRoutes from "./routes/auth.js"
import newsRoutes from "./routes/news.js"
import categoryRoutes from "./routes/categories.js"
import commentRoutes from "./routes/comments.js"
import analyticsRoutes from "./routes/analytics.js"
import adsRoutes from "./routes/ads.js"

dotenv.config()

const app = express()

/* =========================
   FIX __dirname FOR ES MODULE
========================= */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* =========================
   CREATE HTTP SERVER
========================= */

const server = http.createServer(app)

/* =========================
   SOCKET.IO SETUP
========================= */
app.use("/api/ads",adsRoutes)

const io = new Server(server,{
 cors:{
  origin:"*",
  methods:["GET","POST"]
 }
})

app.set("io",io)

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended:true }))

/* =========================
   STATIC FILES (IMAGES)
========================= */

app.use(
 "/uploads",
 express.static(path.join(__dirname,"uploads"))
)

/* =========================
   API ROUTES
========================= */

app.use("/api/auth",authRoutes)

app.use("/api/news",newsRoutes)

app.use("/api/categories",categoryRoutes)

app.use("/api/comments",commentRoutes)

/* =========================
   ROOT ROUTE
========================= */

app.get("/",(req,res)=>{
 res.json({
  status:"OK",
  message:"Rajyavani API Running"
 })
})

/* =========================
   DATABASE CONNECTION
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 console.log("✅ MongoDB Connected Successfully")
})
.catch((err)=>{
 console.error("❌ MongoDB Connection Error:",err)
})
app.use("/api/analytics",analyticsRoutes)
/* =========================
   SOCKET CONNECTION
========================= */

io.on("connection",(socket)=>{

 console.log("🔌 User connected:",socket.id)

 socket.on("disconnect",()=>{
  console.log("❌ User disconnected:",socket.id)
 })

})

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000

server.listen(PORT,()=>{

 console.log(`🚀 Server running on http://localhost:${PORT}`)

})