"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "../../../lib/api"
import NewsCard from "../../../components/NewsCard"

export default function CategoryPage(){

 const { slug } = useParams()

 const [news,setNews] = useState([])

 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  const fetchCategoryNews = async()=>{

   try{

    const res = await api.get(`/news/category/${slug}`)

    setNews(res.data)

   }catch(err){

    console.error(err)

   }

   setLoading(false)

  }

  fetchCategoryNews()

 },[slug])

 if(loading){

  return(

   <div className="text-center py-20">

    Loading news...

   </div>

  )

 }

 return(

  <div className="max-w-7xl mx-auto px-4 py-10">

   <h1 className="text-3xl font-bold mb-8 capitalize">

    {slug} News

   </h1>

   {news.length === 0 ? (

    <p>No news available</p>

   ) : (

    <div className="grid md:grid-cols-3 gap-6">

     {news.map(item=>(
      <NewsCard key={item._id} news={item}/>
     ))}

    </div>

   )}

  </div>

 )
}