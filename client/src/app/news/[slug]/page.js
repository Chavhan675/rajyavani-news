"use client";
export async function generateMetadata({ params }) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news/${params.slug}`
  );

  const news = await res.json();

  return {
    title: news.title,
    description: news.excerpt || news.title,
  };
}

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNewsBySlug, getRelatedNews } from "@/lib/api";
import NewsCard from "@/components/NewsCard";
import Comments from "@/components/Comments";
import AdBanner from "@/components/AdBanner";

export default function NewsPage() {

  const { slug } = useParams();

  const [news, setNews] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {

    const loadNews = async () => {

      try {

        const res = await getNewsBySlug(slug);
        setNews(res.data);

        if(res.data.category){
          const relatedRes = await getRelatedNews(res.data.category);
          setRelated(relatedRes.data.slice(0,3));
        }

      } catch(err){
        console.error(err);
      }

    };

    loadNews();

  }, [slug]);

  if(!news) return <p>Loading...</p>;

  return (

    <article className="article-page">

      {/* title */}

      <h1 className="article-title">
        {news.title}
      </h1>


      {/* meta */}

      <div className="article-meta">

        {news.author && <span>{news.author}</span>}

        {news.createdAt && (
          <span>
            {new Date(news.createdAt).toLocaleDateString()}
          </span>
        )}

      </div>


      {/* image */}

      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="article-image"
        />
      )}


      {/* content */}

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
      <Comments newsId={news._id} />
      <AdBanner
image="/ads/article-ad.jpg"
link="https://example.com"
/>


      {/* related news */}

      {related.length > 0 && (

        <section className="related-news">

          <h2>Related News</h2>

          <div className="news-grid">

            {related.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}

          </div>

        </section>

      )}

    </article>


  );

}