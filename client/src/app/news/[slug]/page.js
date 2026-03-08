export async function generateMetadata({ params }) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news/${params.slug}`,
    { cache: "no-store" }
  );

  const news = await res.json();

  return {
    title: news?.title || "Rajyavani",
    description: news?.content?.slice(0,150) || "Latest Marathi News"
  };
}

export default async function NewsPage({ params }) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news/${params.slug}`,
    { cache: "no-store" }
  );

  const news = await res.json();

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <div style={{maxWidth:"900px",margin:"40px auto"}}>
      <h1>{news.title}</h1>

      {news.image && (
        <img src={news.image} alt={news.title} style={{width:"100%"}} />
      )}

      <p>{news.content}</p>
    </div>
  );
}