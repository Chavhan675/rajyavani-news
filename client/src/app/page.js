"use client"

import { useEffect, useState } from "react"
import api from "../lib/api"

import HeroSection from "../components/HeroSection"
import NewsCard from "../components/NewsCard"
import Sidebar from "../components/Sidebar"
import AdBanner from "../components/AdBanner"

export default function HomePage(){

 const [news,setNews] = useState([])

 useEffect(()=>{

  const fetchNews = async ()=>{

   try{

    const res = await api.get("/api/news")

    setNews(res.data)

   }catch(err){

    console.error(err)

   }

  }

  fetchNews()

 },[])



 return(

  <div className="max-w-7xl mx-auto px-4 py-6 space-y-16">


   {/* HERO SECTION */}

   <HeroSection news={news.slice(0,5)} />


   {/* TOP AD */}

   <AdBanner position="top" />


   {/* TOP STORIES */}

   <section>

    <div className="flex items-center justify-between mb-6">

     <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-3">
      Top Stories
     </h2>

    </div>

    <div className="grid md:grid-cols-3 gap-6">

     {news.slice(5,11).map(item =>(

      <NewsCard
       key={item._id}
       news={item}
      />

     ))}

    </div>

   </section>



   {/* MAIN GRID */}

   <div className="grid lg:grid-cols-4 gap-10">

    {/* LEFT CONTENT */}

    <div className="lg:col-span-3 space-y-14">


     {/* MAHARASHTRA NEWS */}

     <section>

      <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">
       Maharashtra News
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

       {news
        .filter(n => n.category?.name === "Maharashtra")
        .slice(0,6)
        .map(item =>(

         <NewsCard
          key={item._id}
          news={item}
         />

        ))}

      </div>

     </section>



     {/* BETWEEN NEWS AD */}

     <AdBanner position="between" />



     {/* POLITICS */}

     <section>

      <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">
       Politics
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

       {news
        .filter(n => n.category?.name === "Politics")
        .slice(0,6)
        .map(item =>(

         <NewsCard
          key={item._id}
          news={item}
         />

        ))}

      </div>

     </section>



     {/* SPORTS */}

     <section>

      <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">
       Sports
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

       {news
        .filter(n => n.category?.name === "Sports")
        .slice(0,6)
        .map(item =>(

         <NewsCard
          key={item._id}
          news={item}
         />

        ))}

      </div>

     </section>


    </div>



    {/* SIDEBAR */}

    <div className="space-y-10">

     <Sidebar/>

     {/* SIDEBAR AD */}

     <AdBanner position="sidebar" />

    </div>

   </div>



   {/* FOOTER AD */}

   <AdBanner position="footer" />


  </div>

 )

}