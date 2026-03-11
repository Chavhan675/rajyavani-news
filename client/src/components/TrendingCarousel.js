"use client"

import { useEffect,useState,useRef } from "react"
import api from "../services/api"
import Link from "next/link"

export default function TrendingCarousel(){

 const [news,setNews]=useState([])
 const containerRef=useRef(null)

 useEffect(()=>{

  const fetchTrending=async()=>{

   try{

    const res=await api.get("/news/trending")

    setNews(res.data.slice(0,10))

   }catch(err){
    console.error(err)
   }

  }

  fetchTrending()

 },[])


 const scrollLeft=()=>{
  containerRef.current.scrollBy({
   left:-300,
   behavior:"smooth"
  })
 }

 const scrollRight=()=>{
  containerRef.current.scrollBy({
   left:300,
   behavior:"smooth"
  })
 }

 return(

  <section className="my-10">

   {/* TITLE */}

   <div className="flex justify-between items-center mb-4">

    <h2 className="text-xl font-bold border-l-4 border-red-600 pl-3">
     🔥 ट्रेंडिंग
    </h2>

    <div className="flex gap-2">

     <button
      onClick={scrollLeft}
      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
     >
      ‹
     </button>

     <button
      onClick={scrollRight}
      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
     >
      ›
     </button>

    </div>

   </div>



   {/* CAROUSEL */}

   <div
    ref={containerRef}
    className="flex gap-6 overflow-x-auto scroll-smooth"
   >

    {news.map(item=>(

     <Link
      key={item._id}
      href={`/news/${item.slug}`}
      className="min-w-[250px] bg-white rounded-xl shadow hover:shadow-lg transition"
     >

      <img
       src={`http://localhost:5000/uploads/${item.image}`}
       className="w-full h-40 object-cover rounded-t-xl"
      />

      <div className="p-3">

       <p className="font-semibold hover:text-red-600">

        {item.title}

       </p>

      </div>

     </Link>

    ))}

   </div>

  </section>

 )

}