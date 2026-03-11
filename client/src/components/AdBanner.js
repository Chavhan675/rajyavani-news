"use client"

import {useEffect,useState} from "react"
import api from "../lib/api"

export default function AdBanner({position}){

 const [ads,setAds] = useState([])

 useEffect(()=>{

  const fetchAds = async()=>{

   try{

    const res = await api.get(`/ads/position/${position}`)

    setAds(res.data)

   }catch(err){

    console.error("Ad fetch error",err)

   }

  }

  fetchAds()

 },[position])

 return(

  <div>

   {ads.map(ad=>(
    <a key={ad._id} href={ad.link} target="_blank">

     <img
      src={`http://localhost:5000/uploads/${ad.image}`}
      style={{width:"100%",margin:"10px 0"}}
     />

    </a>
   ))}

  </div>

 )

}