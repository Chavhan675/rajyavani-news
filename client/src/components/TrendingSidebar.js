"use client"

import { useEffect, useState } from "react"
import api from "../services/api"
import Link from "next/link"

export default function TrendingSidebar(){

 const [news,setNews] = useState([])

 useEffect(()=>{

  const fetchTrending = async ()=>{

   try{

    const res = await api.get("/news/trending")

    setNews(res.data)

   }catch(err){
    console.error(err)
   }

  }

  fetchTrending()

 },[])

 return(

  <aside className="bg-white shadow rounded-lg p-4">

   <h2 className="text-xl font-bold mb-4">
    Trending News
   </h2>

   <ul className="space-y-3">

    {news.map(item => (

     <li key={item._id}>

      <Link
       href={`/news/${item.slug}`}
       className="hover:text-red-600"
      >
       {item.title}
      </Link>

     </li>

    ))}

   </ul>

  </aside>

 )

}