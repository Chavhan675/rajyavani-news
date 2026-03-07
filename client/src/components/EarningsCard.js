"use client";

import { useEffect, useState } from "react";

export default function EarningsCard(){

const [earnings,setEarnings] = useState({
total:0,
thisMonth:0,
newsCount:0
});

const [loading,setLoading] = useState(true);

useEffect(()=>{

const token = localStorage.getItem("token");

if(!token){
setLoading(false);
return;
}

fetch("http://localhost:5000/api/earnings",{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(data=>{
setEarnings(data);
setLoading(false);
})
.catch(()=>{
setLoading(false);
});

},[]);

if(loading){
return(
<div style={{padding:"20px"}}>
Loading earnings...
</div>
);
}

return(

<div style={{
background:"white",
padding:"20px",
borderRadius:"8px",
marginBottom:"20px",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
}}>

<h3 style={{
marginBottom:"15px",
borderLeft:"5px solid #e4002b",
paddingLeft:"10px"
}}>
Your Earnings
</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px"
}}>

<div style={{
background:"#f7f7f7",
padding:"15px",
borderRadius:"6px",
textAlign:"center"
}}>

<div style={{
fontSize:"14px",
color:"#666"
}}>
Total Earnings
</div>

<div style={{
fontSize:"22px",
fontWeight:"700",
marginTop:"5px"
}}>
₹ {earnings.total}
</div>

</div>

<div style={{
background:"#f7f7f7",
padding:"15px",
borderRadius:"6px",
textAlign:"center"
}}>

<div style={{
fontSize:"14px",
color:"#666"
}}>
This Month
</div>

<div style={{
fontSize:"22px",
fontWeight:"700",
marginTop:"5px"
}}>
₹ {earnings.thisMonth}
</div>

</div>

<div style={{
background:"#f7f7f7",
padding:"15px",
borderRadius:"6px",
textAlign:"center"
}}>

<div style={{
fontSize:"14px",
color:"#666"
}}>
News Published
</div>

<div style={{
fontSize:"22px",
fontWeight:"700",
marginTop:"5px"
}}>
{earnings.newsCount}
</div>

</div>

</div>

</div>

);

}