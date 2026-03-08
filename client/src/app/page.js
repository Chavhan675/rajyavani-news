"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [news, setNews] = useState([]);   // never null
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNews = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news`
        );

        const data = await res.json();

        // make sure data is always array
        setNews(Array.isArray(data) ? data : []);

      } catch (error) {

        console.error("Error fetching news:", error);
        setNews([]);

      } finally {

        setLoading(false);

      }

    };

    fetchNews();

  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  return (

    <div>

      <h1>Latest News</h1>

      {news.length === 0 ? (
        <p>No news available</p>
      ) : (
        news.map((item) => (

          <div key={item._id}>

            <h2>{item.title}</h2>

            <p>{item.content}</p>

          </div>

        ))
      )}

    </div>

  );

}