"use client"

import { useEffect, useState } from "react"
import api from "../services/api"

export default function Sidebar(){

 const [trending,setTrending] = useState([])

 useEffect(()=>{

  const fetchTrending = async ()=>{

   try{

    const res = await api.get("/news")

    setTrending(res.data.slice(0,5))

   }catch(err){

    console.error(err)

   }

  }

  fetchTrending()

 },[])



 return(

  <aside className="space-y-8">

   {/* TRENDING */}

   <div className="bg-white rounded-lg shadow p-4">

    <h3 className="font-bold border-l-4 border-red-600 pl-2 mb-3 text-lg">
     🔥 ट्रेंडिंग
    </h3>

    <ul className="space-y-3 text-sm">

     {trending.map(item =>(

      <li
       key={item._id}
       className="hover:text-red-600 cursor-pointer"
      >

       {item.title}

      </li>

     ))}

    </ul>

   </div>



   {/* ADVERTISEMENT */}

   <div className="bg-yellow-100 border border-yellow-400 rounded-lg h-64 flex items-center justify-center text-gray-700">

    Advertisement

   </div>

  </aside>

 )
}