"use client"

import { useEffect,useState } from "react"
import io from "socket.io-client"
import api from "../lib/api"

const socket = io("http://localhost:5000")

export default function BreakingNews(){

 const [news,setNews] = useState([])

 useEffect(()=>{

  const fetchBreaking = async()=>{

   try{

    const res = await api.get("/api/news")

    setNews(res.data.slice(0,5))

   }catch(err){

    console.error(err)

   }

  }

  fetchBreaking()

  socket.on("breaking-news",(newNews)=>{

   setNews(prev=>[newNews,...prev].slice(0,5))

  })

 },[])

 return(

  <div className="bg-red-600 text-white py-2 overflow-hidden">

   <div className="flex">

    <span className="font-bold px-4">
     BREAKING
    </span>

    <marquee>

     {news.map(n=>n.title).join(" 🔴 ")}

    </marquee>

   </div>

  </div>

 )

}