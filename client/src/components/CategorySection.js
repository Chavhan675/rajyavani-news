"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNewsByCategory } from "@/lib/api";
import NewsCard from "./NewsCard";

export default function CategorySection({ category, title }) {

  const [news, setNews] = useState([]);

  useEffect(() => {

    const loadNews = async () => {
      try {
        const res = await getNewsByCategory(category);
        setNews(res.data.slice(0,4));
      } catch (err) {
        console.error(err);
      }
    };

    loadNews();

  }, [category]);

  if(news.length === 0) return null;

  return (

    <section className="category-section">

      <div className="category-header">

        <h2>{title}</h2>

        <Link href={`/category/${category}`}>
          View All
        </Link>

      </div>

      <div className="news-grid">

        {news.map((item) => (
          <NewsCard key={item._id} news={item} />
        ))}

      </div>

    </section>

  );
}