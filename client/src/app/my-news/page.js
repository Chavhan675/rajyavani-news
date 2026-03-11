"use client"

import { useEffect,useState } from "react"
import Link from "next/link"
import api from "../../services/api"
import { useAuth } from "../../context/AuthContext"

export default function MyNewsPage(){

 const {user} = useAuth()

 const [news,setNews] = useState([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  const fetchMyNews = async ()=>{

   try{

    const res = await api.get("/news")

    const filtered = res.data.filter(
     item => item.author?._id === user?._id
    )

    setNews(filtered)

   }catch(err){

    console.error(err)

   }

   setLoading(false)

  }

  if(user){
   fetchMyNews()
  }

 },[user])

 const deleteNews = async (id)=>{

  if(!confirm("Delete this news?")){
   return
  }

  try{

   await api.delete("/news/" + id)

   setNews(news.filter(n => n._id !== id))

  }catch(err){

   console.error(err)

  }

 }

 if(loading){
  return(
   <div className="text-center py-10">
    Loading...
   </div>
  )
 }

 return(

  <div className="max-w-5xl mx-auto bg-white shadow rounded p-6">

   <h1 className="text-2xl font-bold mb-6">
    My News
   </h1>

   <div className="space-y-4">

    {news.map(item => (

     <div
      key={item._id}
      className="flex justify-between items-center border p-4 rounded"
     >

      <div>

       <h3 className="font-semibold">
        {item.title}
       </h3>

       <p className="text-sm text-gray-500">
        {new Date(item.createdAt).toLocaleDateString()}
       </p>

      </div>

      <div className="flex gap-3">

       <Link
        href={`/news/${item.slug}`}
        className="text-blue-600"
       >
        View
       </Link>

       <Link
        href={`/news/edit/${item._id}`}
        className="text-green-600"
       >
        Edit
       </Link>

       <button
        onClick={()=>deleteNews(item._id)}
        className="text-red-600"
       >
        Delete
       </button>

      </div>

     </div>

    ))}

   </div>

  </div>

 )

}