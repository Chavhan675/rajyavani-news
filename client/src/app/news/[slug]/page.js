"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"
import {useParams} from "next/navigation"
import Image from "next/image"

import AdBanner from "../../../components/AdBanner"
import NewsCard from "../../../components/NewsCard"

const API="http://localhost:5000/api"
const IMG="http://localhost:5000/uploads"

export default function NewsArticle(){

const params=useParams()
const slug=params.slug

const [news,setNews]=useState(null)
const [related,setRelated]=useState([])
const [loading,setLoading]=useState(true)

useEffect(()=>{

async function load(){

try{

const res=await axios.get(`${API}/news/${slug}`)
setNews(res.data)

const rel=await axios.get(`${API}/news/category/${res.data.category.slug}`)
setRelated(rel.data.news || [])

}catch(e){

setNews(null)

}

setLoading(false)

}

if(slug) load()

},[slug])

if(loading){

return(

<div style={{padding:"60px",textAlign:"center"}}>
Loading Article...
</div>

)

}

if(!news){

return(

<div style={{padding:"60px",textAlign:"center"}}>
Article not found
</div>

)

}

return(

<div style={{maxWidth:"1200px",margin:"auto",padding:"20px"}}>

<h1
style={{
fontSize:"32px",
fontWeight:"700",
marginBottom:"10px"
}}
>

{news.title}

</h1>

<div
style={{
fontSize:"14px",
color:"#777",
marginBottom:"20px"
}}
>

{new Date(news.createdAt).toLocaleDateString()}

</div>

<Image
src={
news.image
? `${IMG}/${news.image}`
: "https://via.placeholder.com/800x400"
}
width={800}
height={400}
alt={news.title}
style={{
width:"100%",
height:"400px",
objectFit:"cover",
borderRadius:"6px"
}}
/>

<div
style={{
marginTop:"20px",
fontSize:"18px",
lineHeight:"1.7"
}}
>

{news.content}

</div>

<AdBanner size="horizontal"/>

<h2
style={{
marginTop:"40px",
marginBottom:"15px"
}}
>

Related News

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px"
}}
>

{related
.filter(item=>item.slug!==news.slug)
.slice(0,6)
.map(item=>(

<NewsCard
key={item._id}
news={item}
/>

))}

</div>

</div>

)

}