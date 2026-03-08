"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLatestNews } from "@/lib/api";

export default function BreakingNews(){

  const [news,setNews] = useState([]);

  useEffect(()=>{

    const loadNews = async()=>{
      try{
        const res = await getLatestNews();
        setNews(res.data.slice(0,6));
      }catch(err){
        console.error(err);
      }
    };

    loadNews();

  },[]);

  if(news.length === 0) return null;

  return(

    <div className="breaking-news">

      <span className="breaking-label">
        BREAKING
      </span>

      <div className="breaking-scroll">

        {news.map((item)=>(
          <Link key={item._id} href={`/news/${item.slug}`}>
            {item.title}
          </Link>
        ))}

      </div>

    </div>

  );
}