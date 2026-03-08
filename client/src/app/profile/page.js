"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";

export default function ProfilePage(){

  const [user,setUser] = useState(null);

  useEffect(()=>{

    const loadUser = async()=>{
      try{
        const res = await getProfile();
        setUser(res.data);
      }catch(err){
        console.error(err);
      }
    };

    loadUser();

  },[]);

  if(!user) return <p>Loading...</p>;

  return(

    <div className="profile-page">

      <h1>My Profile</h1>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

    </div>

  );
}