"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"
import {useParams} from "next/navigation"

import NewsCard from "../../../components/NewsCard"

const API="http://localhost:5000/api"

export default function CategoryPage(){

const params=useParams()
const slug=params.slug

const [news,setNews]=useState([])
const [category,setCategory]=useState("")
const [loading,setLoading]=useState(true)

useEffect(()=>{

async function load(){

try{

const res=await axios.get(`${API}/news/category/${slug}`)

setNews(res.data.news || [])
setCategory(res.data.category?.name || slug)

}catch(e){

setNews([])

}

setLoading(false)

}

if(slug) load()

},[slug])

if(loading){

return(

<div style={{padding:"60px",textAlign:"center"}}>
Loading...
</div>

)

}

return(

<div
style={{
maxWidth:"1200px",
margin:"auto",
padding:"20px"
}}
>

<h1
style={{
fontSize:"28px",
marginBottom:"20px",
borderLeft:"6px solid #e4002b",
paddingLeft:"10px"
}}
>

{category}

</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px"
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