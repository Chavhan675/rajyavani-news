"use client";

import Link from "next/link";

export default function NewsCard({ news }) {

  if (!news) return null;

  return (
    <article className="news-card">

      <Link href={`/news/${news.slug}`}>

        <div className="news-image">
          <img
            src={news.image || "/default-news.jpg"}
            alt={news.title}
          />
        </div>

        <div className="news-content">

          {/* category */}
          {news.category && (
            <span className="news-category">
              {news.category}
            </span>
          )}

          {/* title */}
          <h3 className="news-title">
            {news.title}
          </h3>

          {/* description */}
          {news.excerpt && (
            <p className="news-excerpt">
              {news.excerpt}
            </p>
          )}
          import Image from "next/image";

<Image
  src={news.image}
  alt={news.title}
  width={600}
  height={400}
/>

          {/* meta */}
          <div className="news-meta">

            {news.author && (
              <span>{news.author}</span>
            )}

            {news.createdAt && (
              <span>
                {new Date(news.createdAt).toLocaleDateString()}
              </span>
            )}

          </div>

        </div>

      </Link>

    </article>
  );
}