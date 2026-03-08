"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTrendingNews } from "@/lib/api";

export default function HeroSlider(){

  const [news,setNews] = useState([]);
  const [index,setIndex] = useState(0);

  useEffect(()=>{

    const loadNews = async()=>{
      try{
        const res = await getTrendingNews();
        setNews(res.data.slice(0,5));
      }catch(err){
        console.error(err);
      }
    };

    loadNews();

  },[]);

  useEffect(()=>{

    const interval = setInterval(()=>{
      setIndex((prev)=> (prev + 1) % news.length);
    },5000);

    return ()=> clearInterval(interval);

  },[news]);

  if(news.length === 0) return null;

  const item = news[index];

  return(

    <div className="hero-slider">

      <Link href={`/news/${item.slug}`}>

        <img
          src={item.image}
          alt={item.title}
        />

        <div className="slider-overlay">
          <h2>{item.title}</h2>
        </div>

      </Link>
import Image from "next/image";

<Image
  src={news.image}
  alt={news.title}
  width={600}
  height={400}
/>
    </div>

  );
}