"use client"

import React,{useState} from "react"
import {useRouter} from "next/navigation"
import {FaSearch} from "react-icons/fa"

export default function SearchBar(){

const router=useRouter()
const [query,setQuery]=useState("")

function handleSearch(e){

e.preventDefault()

if(!query.trim())return

router.push(`/search?q=${encodeURIComponent(query)}`)

}

return(

<form
onSubmit={handleSearch}
style={{
display:"flex",
alignItems:"center",
gap:"6px"
}}
>

<input
type="text"
placeholder="Search news..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
style={{
padding:"10px",
border:"1px solid #ccc",
borderRadius:"4px",
width:"220px"
}}
/>

<button
type="submit"
style={{
padding:"10px",
background:"#e4002b",
border:"none",
color:"#fff",
borderRadius:"4px",
cursor:"pointer"
}}
>

<FaSearch/>

</button>

</form>

)

}