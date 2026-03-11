"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "../../../services/api"

export default function CreateNewsPage(){

 const router = useRouter()

 const [title,setTitle] = useState("")
 const [description,setDescription] = useState("")
 const [content,setContent] = useState("")
 const [category,setCategory] = useState("")
 const [categories,setCategories] = useState([])
 const [image,setImage] = useState(null)
 const [loading,setLoading] = useState(false)

 useEffect(()=>{

  const fetchCategories = async ()=>{

   try{

    const res = await api.get("/category")

    setCategories(res.data)

   }catch(err){

    console.error(err)

   }

  }

  fetchCategories()

 },[])

 const handleSubmit = async (e)=>{

  e.preventDefault()

  setLoading(true)

  try{

   const formData = new FormData()

   formData.append("title",title)
   formData.append("description",description)
   formData.append("content",content)
   formData.append("category",category)

   if(image){
    formData.append("image",image)
   }

   await api.post("/news",formData)

   router.push("/dashboard")

  }catch(err){

   console.error(err)

  }

  setLoading(false)

 }

 return(

  <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">

   <h1 className="text-2xl font-bold mb-6">
    Create News
   </h1>

   <form onSubmit={handleSubmit} className="space-y-4">

    <div>

     <label className="block mb-1">
      Title
     </label>

     <input
      type="text"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      required
      className="w-full border px-3 py-2 rounded"
     />

    </div>

    <div>

     <label className="block mb-1">
      Description
     </label>

     <textarea
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      required
      className="w-full border px-3 py-2 rounded"
     />

    </div>

    <div>

     <label className="block mb-1">
      Category
     </label>

     <select
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      required
      className="w-full border px-3 py-2 rounded"
     >

      <option value="">
       Select Category
      </option>

      {categories.map((cat)=>(
       <option key={cat._id} value={cat._id}>
        {cat.name}
       </option>
      ))}

     </select>

    </div>

    <div>

     <label className="block mb-1">
      Image
     </label>

     <input
      type="file"
      onChange={(e)=>setImage(e.target.files[0])}
      className="w-full"
     />

    </div>

    <div>

     <label className="block mb-1">
      Content
     </label>

     <textarea
      value={content}
      onChange={(e)=>setContent(e.target.value)}
      rows="8"
      required
      className="w-full border px-3 py-2 rounded"
     />

    </div>

    <button
     type="submit"
     disabled={loading}
     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
     {loading ? "Publishing..." : "Publish News"}
    </button>

   </form>

  </div>

 )

}