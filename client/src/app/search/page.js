"use client"

import { useSearchParams } from "next/navigation"
import { useEffect,useState } from "react"
import api from "../../lib/api"
import NewsCard from "../../components/NewsCard"

export const dynamic = "force-dynamic"

export default function SearchPage(){

 const params = useSearchParams()
 const query = params.get("q")

 const [results,setResults]=useState([])

 useEffect(()=>{

  const fetchResults=async()=>{

   try{

    const res = await api.get(`/api/search?q=${query}`)

    setResults(res.data)

   }catch(err){
    console.error(err)
   }

  }

  if(query){
   fetchResults()
  }

 },[query])

 return(

  <div className="max-w-7xl mx-auto px-4 py-8">

   <h1 className="text-2xl font-bold mb-6">

    Search results for: {query}

   </h1>

   <div className="grid md:grid-cols-3 gap-6">

    {results.map(item=>(
     <NewsCard key={item._id} news={item}/>
    ))}

   </div>

  </div>

 )
}