"use client"

import { useEffect,useState } from "react"
import api from "../../lib/api"
import NewsCard from "../../components/NewsCard"

export default function TrendingPage(){

 const [news,setNews] = useState([])

 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  const fetchTrending = async()=>{

   try{

    const res = await api.get("/news")

    setNews(res.data.slice(0,10))

   }catch(err){

    console.error(err)

   }

   setLoading(false)

  }

  fetchTrending()

 },[])

 if(loading){

  return(

   <div className="text-center py-20">
    Loading trending news...
   </div>

  )

 }

 return(

  <div className="max-w-7xl mx-auto px-4 py-10">

   <h1 className="text-3xl font-bold mb-8">

    Trending News

   </h1>

   <div className="grid md:grid-cols-3 gap-6">

    {news.map(item=>(
     <NewsCard key={item._id} news={item}/>
    ))}

   </div>

  </div>

 )
}