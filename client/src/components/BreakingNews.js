"use client"

import React,{useEffect,useState} from "react"
import Link from "next/link"
import axios from "axios"
import {FaFire} from "react-icons/fa"

const API="http://localhost:5000/api"

export default function BreakingNews(){

const [breaking,setBreaking]=useState([])

useEffect(()=>{

async function load(){

try{

const res=await axios.get(`${API}/news/breaking`)
setBreaking(res.data||[])

}catch(e){
setBreaking([])
}

}

load()

},[])

if(!breaking||breaking.length===0)return null

return(

<div
style={{
width:"100%",
background:"#000",
color:"#fff",
display:"flex",
alignItems:"center",
padding:"8px 0"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"6px",
background:"#e4002b",
padding:"6px 12px",
fontWeight:"600"
}}
>

<FaFire/>
BREAKING

</div>

<div
style={{
flex:1,
overflow:"hidden",
whiteSpace:"nowrap"
}}
>

<marquee>

{breaking.map((n)=>(
<span key={n._id} style={{marginRight:"40px"}}>

<Link
href={`/news/${n.slug}`}
style={{
color:"#fff",
textDecoration:"none"
}}
>

{n.title}

</Link>

</span>
))}

</marquee>

</div>

</div>

)

}