"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "../../lib/api"

export default function RegisterPage(){

 const router = useRouter()

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleSubmit = async(e)=>{
  e.preventDefault()

  try{

   await api.post("/api/auth/register",{
    name,
    email,
    password
   })

   alert("Registration successful")

   router.push("/login")

  }catch(err){

   alert(
    err.response?.data?.message || "Registration failed"
   )

  }

 }

 return(
  <div>Register Page</div>
 )
}