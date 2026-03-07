"use client";

import { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard";
import Link from "next/link";

export default function AdminDashboard(){

const [news,setNews] = useState([]);
const [loading,setLoading] = useState(true);
const [stats,setStats] = useState({
totalNews:0,
totalUsers:0,
totalCategories:0
});

useEffect(()=>{

const token = localStorage.getItem("token");

if(!token){
window.location.href="/login";
return;
}

fetch("http://localhost:5000/api/admin/stats",{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(data=>{
setStats(data);
})
.catch(()=>{});

fetch("http://localhost:5000/api/admin/news",{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(data=>{
setNews(data || []);
setLoading(false);
})
.catch(()=>{
setLoading(false);
});

},[]);

if(loading){

return(
<div className="container" style={{padding:"40px"}}>
Loading admin dashboard...
</div>
);

}

return(

<div className="container">

<h2 style={{
marginTop:"30px",
marginBottom:"20px"
}}>
Admin Dashboard
</h2>

{/* ADMIN STATS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px",
marginBottom:"30px"
}}>

<div style={{
background:"white",
padding:"20px",
borderRadius:"6px"
}}>
<h3>Total News</h3>
<p style={{fontSize:"24px",fontWeight:"700"}}>
{stats.totalNews}
</p>
</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"6px"
}}>
<h3>Total Users</h3>
<p style={{fontSize:"24px",fontWeight:"700"}}>
{stats.totalUsers}
</p>
</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"6px"
}}>
<h3>Categories</h3>
<p style={{fontSize:"24px",fontWeight:"700"}}>
{stats.totalCategories}
</p>
</div>

</div>

{/* CREATE NEWS */}

<Link href="/admin/create-news">

<button style={{
background:"#e4002b",
color:"white",
padding:"10px 20px",
border:"none",
cursor:"pointer",
marginBottom:"20px"
}}>
Create News
</button>

</Link>

{/* NEWS LIST */}

<div className="news-grid">

{news.map(item=>(
<NewsCard key={item._id} news={item}/>
))}

</div>

</div>

);

}