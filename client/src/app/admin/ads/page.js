"use client"

import {useState} from "react"
import api from "../../../lib/api"

export default function AdsPage(){

 const [title,setTitle] = useState("")
 const [link,setLink] = useState("")
 const [position,setPosition] = useState("top")
 const [image,setImage] = useState(null)

 const handleSubmit = async(e)=>{

  e.preventDefault()

  const formData = new FormData()

  formData.append("title",title)
  formData.append("link",link)
  formData.append("position",position)
  formData.append("image",image)

  await api.post("/ads",formData)

  alert("Ad uploaded")

 }

 return(

  <div className="max-w-4xl mx-auto py-10">

   <h1 className="text-3xl font-bold mb-6">
    Upload Advertisement
   </h1>

   <form onSubmit={handleSubmit} className="space-y-4">

    <input
     placeholder="Ad Title"
     className="border p-2 w-full"
     onChange={(e)=>setTitle(e.target.value)}
    />

    <input
     placeholder="Ad Link"
     className="border p-2 w-full"
     onChange={(e)=>setLink(e.target.value)}
    />

    <select
     className="border p-2 w-full"
     onChange={(e)=>setPosition(e.target.value)}
    >

     <option value="top">Top Banner</option>
     <option value="sidebar">Sidebar</option>
     <option value="between">Between News</option>
     <option value="footer">Footer</option>

    </select>

    <input
     type="file"
     onChange={(e)=>setImage(e.target.files[0])}
    />

    <button className="bg-red-600 text-white px-6 py-2">

     Upload Ad

    </button>

   </form>

  </div>

 )
}