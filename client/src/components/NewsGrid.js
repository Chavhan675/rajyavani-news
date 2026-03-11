"use client"

import Link from "next/link"

export default function NewsGrid({news}){

 if(!news || news.length===0){
  return null
 }

 const main = news[0]
 const others = news.slice(1,5)

 return(

  <section className="mt-10">

   {/* BIG STORY */}

   <Link href={`/news/${main.slug}`}>

    <div className="relative rounded-xl overflow-hidden shadow-lg mb-6">

     <img
      src={`http://localhost:5000/uploads/${main.image}`}
      className="w-full h-[350px] object-cover"
     />

     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">

      <h2 className="text-white text-3xl font-bold">
       {main.title}
      </h2>

     </div>

    </div>

   </Link>


   {/* SMALL STORIES */}

   <div className="grid md:grid-cols-2 gap-6">

    {others.map(item => (

     <Link key={item._id} href={`/news/${item.slug}`}>

      <div className="flex gap-4 bg-white rounded-lg shadow hover:shadow-lg p-3 transition">

       <img
        src={`http://localhost:5000/uploads/${item.image}`}
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