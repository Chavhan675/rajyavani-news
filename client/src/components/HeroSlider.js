"use client"

import { useEffect,useState } from "react"
import Link from "next/link"

export default function HeroSlider({news}){

 const [index,setIndex] = useState(0)

 useEffect(()=>{

  if(!news || news.length===0) return

  const interval=setInterval(()=>{
   setIndex(prev => (prev+1)%news.length)
  },5000)

  return ()=>clearInterval(interval)

 },[news])

 if(!news || news.length===0){
  return null
 }

 const current=news[index]

 const nextSlide=()=>{
  setIndex((index+1)%news.length)
 }

 const prevSlide=()=>{
  setIndex((index-1+news.length)%news.length)
 }

 return(

  <section className="relative w-full h-[300px] md:h-[420px] lg:h-[500px] overflow-hidden rounded-xl shadow-lg">

   {/* IMAGE */}

   <img
    src={`http://localhost:5000/uploads/${current.image}`}
    alt={current.title}
    className="w-full h-full object-cover transition duration-700 hover:scale-105"
   />


   {/* OVERLAY */}

   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>


   {/* TEXT */}

   <div className="absolute bottom-10 left-8 right-8 text-white">

    <Link href={`/news/${current.slug}`}>

     <h1 className="text-2xl md:text-4xl font-bold hover:text-red-400 transition">

      {current.title}

     </h1>

    </Link>

   </div>



   {/* LEFT ARROW */}

   <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition"
   >

    ‹

   </button>



   {/* RIGHT ARROW */}

   <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition"
   >

    ›

   </button>



   {/* INDICATORS */}

   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

    {news.map((_,i)=>(
     <div
      key={i}
      className={`w-3 h-3 rounded-full ${
       i===index ? "bg-red-500" : "bg-white/60"
      }`}
     ></div>
    ))}

   </div>

  </section>

 )

}