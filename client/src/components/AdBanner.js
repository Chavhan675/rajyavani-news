"use client"

import React from "react"

export default function AdBanner({size="horizontal"}){

let style={}

if(size==="horizontal"){
style={
width:"100%",
height:"90px",
background:"#eee",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"20px 0",
fontWeight:"600",
fontSize:"18px",
borderRadius:"6px"
}
}

if(size==="sidebar"){
style={
width:"100%",
height:"250px",
background:"#eee",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:"20px",
fontWeight:"600",
fontSize:"18px",
borderRadius:"6px"
}
}

return(

<div style={style}>
Advertisement
</div>

)

}