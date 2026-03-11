"use client"

import { useEffect,useState } from "react"
import { useParams } from "next/navigation"
import api from "../../../services/api"
import AdBanner from "../../../components/AdBanner"

export default function NewsPage(){

 const { slug } = useParams()

 const [news,setNews] = useState(null)

 useEffect(()=>{

  const fetchNews = async()=>{

   try{

    const res = await api.get(`/news/${slug}`)

    setNews(res.data)

   }catch(err){

    console.error(err)

   }

  }

  if(slug) fetchNews()

 },[slug])


 if(!news){

  return(
   <div className="max-w-4xl mx-auto py-20 text-center">
    Loading...
   </div>
  )

 }


 return(

  <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">


   {/* NEWS TITLE */}

   <h1 className="text-4xl font-bold leading-snug">
    {news.title}
   </h1>


   {/* CATEGORY */}

   <div className="text-red-600 font-semibold">
    {news.category?.name}
   </div>


   {/* IMAGE */}

   {news.image &&(

    <img
     src={`http://localhost:5000/uploads/${news.image}`}
     className="w-full rounded-lg"
    />

   )}


   {/* AD */}

   <AdBanner position="between" />


   {/* CONTENT */}

   <div className="text-lg leading-relaxed space-y-6">

    {news.content}

   </div>


   {/* FOOTER AD */}

   <AdBanner position="footer" />


  </div>

 )

}