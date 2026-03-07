"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"
import NewsCard from "../../components/NewsCard"

const API="http://localhost:5000/api"

export default function Dashboard(){

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

const res=await axios.get(`${API}/news/my-news`,{
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

if(loading){

return(

<div style={{padding:"60px",textAlign:"center"}}>
Loading Dashboard...
</div>

)

}

return(

<div style={{maxWidth:"1200px",margin:"auto",padding:"20px"}}>

<h1 style={{marginBottom:"20px"}}>My News</h1>

{news.length===0 && (

<p>No news submitted</p>

)}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px"
}}
>

{news.map(item=>(

<NewsCard
key={item._id}
news={item}
/>

))}

</div>

</div>

)

}