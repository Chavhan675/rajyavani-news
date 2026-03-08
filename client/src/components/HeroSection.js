"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLatestNews } from "@/lib/api";

export default function HeroSection() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    const loadNews = async () => {
      try {
        const res = await getLatestNews();
        setNews(res.data.slice(0,5));
      } catch (err) {
        console.error(err);
      }
    };

    loadNews();

  }, []);

  if(news.length === 0) return null;

  const mainNews = news[0];
  const sideNews = news.slice(1);

  return (
    <section className="hero-section">

      {/* main news */}
      import Image from "next/image";

<Image
  src={news.image}
  alt={news.title}
  width={600}
  height={400}
/>

      <div className="hero-main">

        <Link href={`/news/${mainNews.slug}`}>

          <img
            src={mainNews.image}
            alt={mainNews.title}
          />

          <div className="hero-overlay">

            <h1>
              {mainNews.title}
            </h1>

          </div>

        </Link>

      </div>


      {/* side news */}

      <div className="hero-side">

        {sideNews.map((item) => (

          <Link key={item._id} href={`/news/${item.slug}`}>

            <div className="hero-small">

              <img
                src={item.image}
                alt={item.title}
              />

              <p>{item.title}</p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}