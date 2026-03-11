"use client"

import Link from "next/link"

export default function HeroSection({news}){

 if(!news || news.length===0){
  return null
 }

 const main=news[0]
 const side=news.slice(1,5)

 return(

  <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

   {/* BIG STORY */}

   <Link href={`/news/${main.slug}`} className="lg:col-span-2">

    <div className="relative h-[350px] md:h-[420px] rounded-xl overflow-hidden shadow-lg">

     <img
      src={`http://localhost:5000/uploads/${main.image}`}
      alt={main.title}
      className="w-full h-full object-cover"
     />

     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"/>

     <div className="absolute bottom-6 left-6 right-6 text-white">

      <h1 className="text-2xl md:text-4xl font-bold hover:text-red-400 transition">

       {main.title}

      </h1>

     </div>

    </div>

   </Link>



   {/* SMALL STORIES */}

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

    {side.map(item=>(

     <Link key={item._id} href={`/news/${item.slug}`}>

      <div className="flex gap-4 bg-white rounded-xl shadow hover:shadow-lg transition p-3">

       <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.title}
        className="w-28 h-20 object-cover rounded"
       />

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