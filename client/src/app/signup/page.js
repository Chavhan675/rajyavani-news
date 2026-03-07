"use client"

import React,{useEffect,useState} from "react"
import {useSearchParams} from "next/navigation"
import axios from "axios"

import NewsCard from "../../components/NewsCard"

const API="http://localhost:5000/api"

export default function SearchPage(){

const searchParams=useSearchParams()
const query=searchParams.get("q")

const [results,setResults]=useState([])
const [loading,setLoading]=useState(true)

useEffect(()=>{

async function search(){

try{

const res=await axios.get(`${API}/news/search?q=${query}`)
setResults(res.data || [])

}catch(e){

setResults([])

}

setLoading(false)

}

if(query) search()

},[query])

if(loading){

return(

<div style={{padding:"60px",textAlign:"center"}}>
Searching news...
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
marginBottom:"20px"
}}
>

Search Results for "{query}"

</h1>

{results.length===0 && (

<p>No news found</p>

)}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px"
}}
>

{results.map(news=>(

<NewsCard
key={news._id}
news={news}
/>

))}

</div>

</div>

)

}