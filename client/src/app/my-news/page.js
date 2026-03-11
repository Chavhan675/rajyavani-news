"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import Link from "next/link"
import api from "../../lib/api"
import { useAuth } from "../../context/AuthContext"

export default function MyNewsPage(){

 const auth = useAuth()

 const user = auth?.user

 const [news,setNews] = useState([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  const fetchMyNews = async ()=>{

   try{

    const res = await api.get("/api/news/my")

    setNews(res.data || [])

   }catch(err){

    console.error("Error fetching news:",err)

   }finally{

    setLoading(false)

   }

  }

  if(user){
   fetchMyNews()
  }

 },[user])

 if(loading){
  return(
   <div className="text-center py-10">
    Loading...
   </div>
  )
 }

 if(!user){
  return(
   <div className="text-center py-10">
    Please login to view your news
   </div>
  )
 }

 return(

  <div className="max-w-5xl mx-auto py-8 space-y-6">

   <h1 className="text-3xl font-bold">
    My News
   </h1>

   {news.length === 0 ? (
    <p>No news found</p>
   ) : (
    news.map(item=>(
     <div key={item._id} className="border p-4 rounded">

      <h2 className="text-xl font-semibold">
       {item.title}
      </h2>

      <Link
       href={`/news/${item.slug}`}
       className="text-blue-600"
      >
       View
      </Link>

     </div>
    ))
   )}

  </div>

 )
}