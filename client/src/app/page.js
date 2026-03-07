"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"

import HeroSlider from "../components/HeroSlider"
import BreakingNews from "../components/BreakingNews"
import NewsCard from "../components/NewsCard"
import CategorySection from "../components/CategorySection"
import AdBanner from "../components/AdBanner"

const API="http://localhost:5000/api"

export default function HomePage(){

const [latest,setLatest]=useState([])
const [trending,setTrending]=useState([])
const [loading,setLoading]=useState(true)

useEffect(()=>{

async function load(){

try{

const latestRes=await axios.get(`${API}/news/latest`)
setLatest(latestRes.data)

const trendingRes=await axios.get(`${API}/news/trending`)
setTrending(trendingRes.data)

}catch(e){

setLatest([])
setTrending([])

}

setLoading(false)

}

load()

},[])

if(loading){

return(
<div style={{textAlign:"center",padding:"60px"}}>
Loading News...
</div>
)

}

return(

<div>



<div style={{maxWidth:"1400px",margin:"auto",padding:"20px"}}>

<HeroSlider/>

<AdBanner size="horizontal"/>

<div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"20px",marginTop:"20px"}}>

<div>

<h2 style={{marginBottom:"15px"}}>Latest News</h2>

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"15px"}}>

{latest.map(news=>(

<NewsCard key={news._id} news={news}/>

))}

</div>

</div>

<div>

<h3 style={{marginBottom:"10px"}}>Trending News</h3>

{trending.map(item=>(

<div key={item._id} style={{marginBottom:"10px",fontSize:"14px"}}>

<a href={`/news/${item.slug}`} style={{textDecoration:"none",color:"#111"}}>

{item.title}

</a>

</div>

))}

<AdBanner size="sidebar"/>

</div>

</div>

<CategorySection slug="maharashtra" title="महाराष्ट्र बातम्या"/>
<CategorySection slug="politics" title="राजकारण"/>
<CategorySection slug="sports" title="क्रीडा"/>
<CategorySection slug="entertainment" title="मनोरंजन"/>

</div>

</div>

)

}