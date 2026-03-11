export const dynamic = "force-dynamic"

"use client"

import { useEffect, useState } from "react"
import { getProfile } from "@/lib/api"

export default function ProfilePage(){

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const loadUser = async()=>{

      try{

        const res = await getProfile()

        setUser(res?.data || null)

      }catch(err){

        console.error("Profile error:",err)

      }finally{

        setLoading(false)

      }

    }

    loadUser()

  },[])

  if(loading){
    return(
      <div className="text-center py-20">
        Loading profile...
      </div>
    )
  }

  if(!user){
    return(
      <div className="text-center py-20">
        User not logged in
      </div>
    )
  }

  return(

    <div className="max-w-3xl mx-auto py-10">

      <h1 className="text-2xl font-bold mb-6">
        My Profile
      </h1>

      <div className="space-y-3">

        <p>
          <b>Name:</b> {user.name}
        </p>

        <p>
          <b>Email:</b> {user.email}
        </p>

      </div>

    </div>

  )
}