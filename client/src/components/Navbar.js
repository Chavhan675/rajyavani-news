"use client"

import Link from "next/link"

export default function Navbar(){

return(

<header style={{background:"#fff",borderBottom:"2px solid #e11d48"}}>

<div style={{
maxWidth:"1200px",
margin:"auto",
padding:"15px",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

<Link href="/" style={{fontSize:"32px",fontWeight:"bold",color:"#e11d48",textDecoration:"none"}}>
राज्यवाणी
</Link>

<div>

<input
placeholder="Search news..."
style={{
padding:"8px",
border:"1px solid #ccc",
borderRadius:"4px"
}}
/>

<button
style={{
background:"#e11d48",
color:"#fff",
padding:"8px 12px",
marginLeft:"5px",
border:"none",
borderRadius:"4px"
}}
>
🔍
</button>

</div>

</div>

<nav style={{background:"#e11d48"}}>

<div style={{
maxWidth:"1200px",
margin:"auto",
padding:"10px",
display:"flex",
gap:"20px",
color:"#fff",
fontWeight:"bold"
}}>

<Link href="/" style={{color:"#fff",textDecoration:"none"}}>मुख्यपृष्ठ</Link>
<Link href="/category/maharashtra" style={{color:"#fff"}}>महाराष्ट्र</Link>
<Link href="/category/politics" style={{color:"#fff"}}>राजकारण</Link>
<Link href="/category/crime" style={{color:"#fff"}}>गुन्हे</Link>
<Link href="/category/sports" style={{color:"#fff"}}>क्रीडा</Link>
<Link href="/category/entertainment" style={{color:"#fff"}}>मनोरंजन</Link>
<Link href="/category/business" style={{color:"#fff"}}>व्यवसाय</Link>
<Link href="/category/technology" style={{color:"#fff"}}>तंत्रज्ञान</Link>
<Link href="/category/education" style={{color:"#fff"}}>शिक्षण</Link>
<Link href="/category/jobs" style={{color:"#fff"}}>नोकरी</Link>

</div>

</nav>

</header>

)

}