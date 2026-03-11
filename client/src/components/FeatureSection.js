"use client"

import Link from "next/link"

export default function FeatureSection(){

 const features = [

  {
   name:"Admin Dashboard",
   path:"/admin"
  },

  {
   name:"Latest News",
   path:"/"
  },

  {
   name:"Search News",
   path:"/search"
  },

  {
   name:"Categories",
   path:"/category/maharashtra"
  },

  {
   name:"Trending News",
   path:"/trending"
  },

  {
   name:"Comments",
   path:"/news"
  }

 ]

 return(

  <section className="max-w-7xl mx-auto py-10">

   <h2 className="text-2xl font-bold mb-6">
    Explore Rajyavani
   </h2>

   <div className="grid md:grid-cols-3 gap-6">

    {features.map((feature,index)=>(
     
     <Link
      key={index}
      href={feature.path}
      className="border p-6 rounded shadow hover:bg-red-50 transition"
     >

      <h3 className="text-lg font-semibold">
       {feature.name}
      </h3>

     </Link>

    ))}

   </div>

  </section>

 )

}