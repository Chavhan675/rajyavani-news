"use client"

import React,{useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

const API="http://localhost:5000/api"

export default function SubmitNews(){

const router=useRouter()

const [title,setTitle]=useState("")
const [content,setContent]=useState("")
const [category,setCategory]=useState("")
const [image,setImage]=useState(null)
const [categories,setCategories]=useState([])
const [loading,setLoading]=useState(false)

useEffect(()=>{

async function load(){

try{

const res=await axios.get(`${API}/news/categories`)
setCategories(res.data)

}catch(e){

setCategories([])

}

}

load()

},[])

async function handleSubmit(e){

e.preventDefault()

const token=localStorage.getItem("token")

if(!token){
alert("Login required")
router.push("/login")
return
}

const formData=new FormData()

formData.append("title",title)
formData.append("content",content)
formData.append("category",category)

if(image){
formData.append("image",image)
}

setLoading(true)

try{

await axios.post(`${API}/news/create`,formData,{
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"multipart/form-data"
}
})

alert("News submitted")

router.push("/dashboard")

}catch(e){

alert("Submission failed")

}

setLoading(false)

}

return(

<div style={{maxWidth:"700px",margin:"auto",padding:"40px"}}>

<h1 style={{marginBottom:"20px"}}>
Submit News
</h1>

<form onSubmit={handleSubmit}>

<input
placeholder="News Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"10px"}}
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"10px"}}
>

<option value="">Select Category</option>

{categories.map(cat=>(

<option key={cat._id} value={cat._id}>
{cat.name}
</option>

))}

</select>

<textarea
placeholder="News Content"
value={content}
onChange={(e)=>setContent(e.target.value)}
style={{
width:"100%",
padding:"10px",
height:"200px",
marginBottom:"10px"
}}
/>

<input
type="file"
accept="image/*"
onChange={(e)=>setImage(e.target.files[0])}
style={{marginBottom:"10px"}}
/>

<button
style={{padding:"10px 20px"}}
>

{loading ? "Submitting..." : "Submit News"}

</button>

</form>

</div>

)

}