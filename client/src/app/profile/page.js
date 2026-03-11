"use client"

import { useEffect, useState } from "react"
import { getProfile } from "../../lib/api"

export const dynamic = "force-dynamic"

export default function ProfilePage(){

  const [user,setUser] = useState(null)

  useEffect(()=>{

    const loadUser = async()=>{
      try{
        const res = await getProfile()
        setUser(res.data)
      }catch(err){
        console.error("Profile error:",err)
      }
    }

    loadUser()

  },[])

  if(!user){
    return(
      <div style={{padding:"40px"}}>
        <h2>Loading profile...</h2>
      </div>
    )
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>My Profile</h1>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

    </div>

  )
}