export const dynamic = "force-dynamic"

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "../../lib/api"

export default function RegisterPage(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e)=>{

    e.preventDefault()

    if(!name || !email || !password){
      alert("Please fill all fields")
      return
    }

    try{

      setLoading(true)

      await api.post("/api/auth/register",{
        name,
        email,
        password
      })

      alert("Registration successful")

      router.push("/login")

    }catch(err){

      console.error("Register error:",err)

      alert(
        err?.response?.data?.message || "Registration failed"
      )

    }finally{

      setLoading(false)

    }

  }

  return(

    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-white shadow-lg p-8 w-[400px]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white w-full py-2 hover:bg-red-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

      </div>

    </div>

  )

}