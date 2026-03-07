"use client"

import {useEffect,useState} from "react"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"

const API="http://localhost:5000/api"
const IMG="http://localhost:5000/uploads"

export default function HeroSection(){

const [news,setNews]=useState([])

useEffect(()=>{

async function load(){

try{

const res=await axios.get(`${API}/news/latest`)
setNews(res.data.slice(0,5))

}catch(e){

setNews([])

}

}

load()

},[])

if(news.length===0) return null

const main=news[0]
const side=news.slice(1,5)

return(

<div className="hero-grid">

<div className="hero-main">

<Link href={`/news/${main.slug}`}>

<Image
src={main.image ? `${IMG}/${main.image}` : "https://via.placeholder.com/800x500"}
width={800}
height={500}
alt={main.title}
/>

<h2>{main.title}</h2>

</Link>

</div>

<div className="hero-side">

{side.map(item=>(

<div key={item._id}>

<Link href={`/news/${item.slug}`}>

<Image
src={item.image ? `${IMG}/${item.image}` : "https://via.placeholder.com/400x250"}
width={400}
height={250}
alt={item.title}
/>

<p>{item.title}</p>

</Link>

</div>

))}

</div>

</div>

)

}