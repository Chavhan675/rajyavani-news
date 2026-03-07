"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"

const API="http://localhost:5000/api"

export default function AdminPanel(){

const [news,setNews]=useState([])
const [loading,setLoading]=useState(true)

useEffect(()=>{

async function load(){

const token=localStorage.getItem("token")

if(!token){
setLoading(false)
return
}

try{

const res=await axios.get(`${API}/admin/news`,{
headers:{
Authorization:`Bearer ${token}`
}
})

setNews(res.data)

}catch(e){

setNews([])

}

setLoading(false)

}

load()

},[])

async function approve(id){

const token=localStorage.getItem("token")

try{

await axios.put(`${API}/admin/approve/${id}`,{},{
headers:{
Authorization:`Bearer ${token}`
}
})

window.location.reload()

}catch(e){

alert("Failed")

}

}

if(loading){

return(

<div style={{padding:"60px",textAlign:"center"}}>
Loading Admin Panel...
</div>

)

}

return(

<div style={{maxWidth:"1000px",margin:"auto",padding:"30px"}}>

<h1 style={{marginBottom:"20px"}}>Admin News Approval</h1>

<table style={{width:"100%"}}>

<thead>

<tr>
<th>Title</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{news.map(n=>(

<tr key={n._id}>

<td>{n.title}</td>

<td>{n.status}</td>

<td>

<button
onClick={()=>approve(n._id)}
style={{padding:"6px 12px"}}
>

Approve

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}