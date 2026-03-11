"use client"

import Link from "next/link"
import NewsCard from "./NewsCard"

export default function CategorySection({title,news}){

 if(!news || news.length===0){
  return null
 }

 return(

  <section className="mt-12">

   {/* SECTION HEADER */}

   <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-3">
     {title}
    </h2>

    <Link
     href={`/category/${title}`}
     className="text-red-600 font-medium hover:underline"
    >
     सर्व बातम्या →
    </Link>

   </div>

   {/* NEWS GRID */}

   <div className="grid md:grid-cols-4 gap-6">

    {news.slice(0,4).map(item=>(
     <NewsCard key={item._id} news={item}/>
    ))}

   </div>

  </section>

 )

}