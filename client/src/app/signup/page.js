export const dynamic = "force-dynamic"

"use client"

import { useState } from "react"

export default function Signup() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if(!name || !email || !password){
      alert("Please fill all fields")
      return
    }

    try{

      setLoading(true)

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

      alert(data.message || "Signup successful")

      setName("")
      setEmail("")
      setPassword("")

    }catch(err){

      console.error("Signup error:",err)
      alert("Signup failed")

    }finally{

      setLoading(false)

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

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>

      </form>

    </div>

  )

}