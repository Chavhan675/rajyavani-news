"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"
import Link from "next/link"
import NewsCard from "./NewsCard"

const API="http://localhost:5000/api"

export default function CategorySection({slug,title}){

const [news,setNews]=useState([])
const [loading,setLoading]=useState(true)

useEffect(()=>{

async function load(){

try{

const res=await axios.get(`${API}/news/category/${slug}`)
setNews(res.data.news || [])

}catch(e){
setNews([])
}

setLoading(false)

}

load()

},[slug])

if(loading) return null
if(!news || news.length===0) return null

return(

<section
style={{
marginTop:"40px"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"15px"
}}
>

<h2
style={{
fontSize:"22px",
fontWeight:"700",
borderLeft:"6px solid #e4002b",
paddingLeft:"10px"
}}
>

{title}

</h2>

<Link
href={`/category/${slug}`}
style={{
textDecoration:"none",
fontSize:"14px",
color:"#e4002b",
fontWeight:"600"
}}
>

View All

</Link>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px"
}}
>

{news.slice(0,6).map(item=>(

<NewsCard
key={item._id}
news={item}
/>

))}

</div>

</section>

)

}