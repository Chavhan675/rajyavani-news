"use client";

import { useState } from "react";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage(){

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await registerUser({
        name,
        email,
        password
      });

      alert("Account created");

      router.push("/login");

    }catch(err){
      console.error(err);
      alert("Registration failed");
    }
  };

  return(

    <div className="auth-page">

      <h1>Register</h1>

      <form onSubmit={handleSubmit} className="auth-form">

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

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );
}