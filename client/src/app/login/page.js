"use client"

import React,{useState} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

const API="http://localhost:5000/api"

export default function Login(){

const router=useRouter()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [loading,setLoading]=useState(false)

async function handleSubmit(e){

e.preventDefault()

setLoading(true)

try{

const res=await axios.post(`${API}/auth/login`,{
email,
password
})

localStorage.setItem("token",res.data.token)

alert("Login successful")

router.push("/")

}catch(e){

alert("Login failed")

}

setLoading(false)

}

return(

<div style={{maxWidth:"500px",margin:"auto",padding:"40px"}}>

<h1 style={{marginBottom:"20px"}}>Login</h1>

<form onSubmit={handleSubmit}>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"10px"}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"10px"}}
/>

<button
type="submit"
style={{padding:"10px 20px"}}
>

{loading ? "Logging in..." : "Login"}

</button>

</form>

</div>

)

}