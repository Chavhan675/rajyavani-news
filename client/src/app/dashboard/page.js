"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../context/AuthContext"

export default function DashboardPage(){

 const {user,loading,logout} = useAuth()
 const router = useRouter()

 useEffect(()=>{

  if(!loading && !user){
   router.push("/login")
  }

 },[user,loading,router])

 if(loading){
  return(
   <div className="text-center py-10">
    Loading...
   </div>
  )
 }

 if(!user){
  return null
 }

 return(

  <div className="max-w-4xl mx-auto bg-white shadow rounded p-6 space-y-6">

   <h1 className="text-3xl font-bold">
    Dashboard
   </h1>

   <div className="space-y-2">

    <p>
     <strong>Name:</strong> {user.name}
    </p>

    <p>
     <strong>Email:</strong> {user.email}
    </p>

    <p>
     <strong>Role:</strong> {user.role}
    </p>

   </div>

   <div className="flex flex-wrap gap-4 pt-4">

    <Link
     href="/news/create"
     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
     Create News
    </Link>

    <Link
     href="/my-news"
     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
     My News
    </Link>

    <button
     onClick={logout}
     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
     Logout
    </button>

   </div>

  </div>

 )

}