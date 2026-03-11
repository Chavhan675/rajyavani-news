"use client"

import { useState } from "react"

export const dynamic = "force-dynamic"

export default function Signup() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({name,email,password})
        }
      )

      const data = await res.json()

      alert(data.message)

    }catch(err){
      console.log(err)
    }

  }

  return(

    <div className="authContainer">

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>

      </form>

    </div>

  )

}