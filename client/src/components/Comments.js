"use client"

import React,{useState,useEffect} from "react"
import axios from "axios"

const API="http://localhost:5000/api"

export default function Comments({newsId}){

const [comments,setComments]=useState([])
const [text,setText]=useState("")
const [loading,setLoading]=useState(false)

useEffect(()=>{

async function load(){

try{

const res=await axios.get(`${API}/comments/${newsId}`)
setComments(res.data)

}catch(e){

setComments([])

}

}

if(newsId) load()

},[newsId])

async function addComment(e){

e.preventDefault()

const token=localStorage.getItem("token")

if(!token){
alert("Login required")
return
}

setLoading(true)

try{

await axios.post(`${API}/comments`,{

newsId,
text

},{
headers:{
Authorization:`Bearer ${token}`
}
})

setText("")
window.location.reload()

}catch(e){

alert("Failed")

}

setLoading(false)

}

return(

<div style={{marginTop:"40px"}}>

<h3 style={{marginBottom:"10px"}}>Comments</h3>

<form onSubmit={addComment}>

<textarea
placeholder="Write comment..."
value={text}
onChange={(e)=>setText(e.target.value)}
style={{
width:"100%",
padding:"10px",
height:"80px",
marginBottom:"10px"
}}
/>

<button style={{padding:"8px 20px"}}>

{loading ? "Posting..." : "Post Comment"}

</button>

</form>

<div style={{marginTop:"20px"}}>

{comments.map(c=>(

<div
key={c._id}
style={{
borderBottom:"1px solid #eee",
padding:"10px 0"
}}
>

<b>{c.user?.name}</b>

<p>{c.text}</p>

</div>

))}

</div>

</div>

)

}