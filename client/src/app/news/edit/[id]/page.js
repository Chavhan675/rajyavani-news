"use client"

import { useState,useEffect } from "react"
import { useRouter,useParams } from "next/navigation"
import api from "../../../../services/api"

export default function EditNewsPage(){

 const router = useRouter()
 const {id} = useParams()

 const [title,setTitle] = useState("")
 const [description,setDescription] = useState("")
 const [content,setContent] = useState("")
 const [category,setCategory] = useState("")
 const [categories,setCategories] = useState([])
 const [image,setImage] = useState(null)
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  const fetchData = async ()=>{

   try{

    const newsRes = await api.get("/news")

    const newsItem = newsRes.data.find(n => n._id === id)

    if(newsItem){

     setTitle(newsItem.title)
     setDescription(newsItem.description)
     setContent(newsItem.content)
     setCategory(newsItem.category?._id)

    }

    const catRes = await api.get("/category")

    setCategories(catRes.data)

   }catch(err){

    console.error(err)

   }

   setLoading(false)

  }

  if(id){
   fetchData()
  }

 },[id])

 const handleSubmit = async (e)=>{

  e.preventDefault()

  const formData = new FormData()

  formData.append("title",title)
  formData.append("description",description)
  formData.append("content",content)
  formData.append("category",category)

  if(image){
   formData.append("image",image)
  }

  try{

   await api.put("/news/" + id,formData)

   router.push("/my-news")

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

  <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">

   <h1 className="text-2xl font-bold mb-6">
    Edit News
   </h1>

   <form onSubmit={handleSubmit} className="space-y-4">

    <input
     type="text"
     value={title}
     onChange={(e)=>setTitle(e.target.value)}
     className="w-full border px-3 py-2 rounded"
     required
    />

    <textarea
     value={description}
     onChange={(e)=>setDescription(e.target.value)}
     className="w-full border px-3 py-2 rounded"
     required
    />

    <select
     value={category}
     onChange={(e)=>setCategory(e.target.value)}
     className="w-full border px-3 py-2 rounded"
     required
    >

     {categories.map(cat => (
      <option key={cat._id} value={cat._id}>
       {cat.name}
      </option>
     ))}

    </select>

    <input
     type="file"
     onChange={(e)=>setImage(e.target.files[0])}
    />

    <textarea
     rows="8"
     value={content}
     onChange={(e)=>setContent(e.target.value)}
     className="w-full border px-3 py-2 rounded"
     required
    />

    <button
     type="submit"
     className="bg-blue-600 text-white px-4 py-2 rounded"
    >
     Update News
    </button>

   </form>

  </div>

 )

}