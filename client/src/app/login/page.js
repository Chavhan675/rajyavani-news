"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await loginUser({email,password});

      alert("Login successful");

      router.push("/");

    }catch(err){
      console.error(err);
      alert("Login failed");
    }
  };

  return(

    <div className="auth-page">

      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="auth-form">

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

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}