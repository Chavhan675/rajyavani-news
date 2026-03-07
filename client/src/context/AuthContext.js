"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){

const [user,setUser] = useState(null);
const [token,setToken] = useState(null);
const [loading,setLoading] = useState(true);

useEffect(()=>{

if(typeof window !== "undefined"){

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

if(storedUser && storedToken){

setUser(JSON.parse(storedUser));
setToken(storedToken);

}

setLoading(false);

}

},[]);

/* ================= LOGIN ================= */

const login = (userData,tokenData)=>{

localStorage.setItem("user",JSON.stringify(userData));
localStorage.setItem("token",tokenData);

setUser(userData);
setToken(tokenData);

};

/* ================= LOGOUT ================= */

const logout = ()=>{

localStorage.removeItem("user");
localStorage.removeItem("token");

setUser(null);
setToken(null);

};

/* ================= UPDATE USER ================= */

const updateUser = (data)=>{

const updated = {...user,...data};

localStorage.setItem("user",JSON.stringify(updated));

setUser(updated);

};

return(

<AuthContext.Provider
value={{
user,
token,
loading,
login,
logout,
updateUser
}}
>

{children}

</AuthContext.Provider>

);

}

/* ================= USE AUTH HOOK ================= */

export function useAuth(){

return useContext(AuthContext);

}