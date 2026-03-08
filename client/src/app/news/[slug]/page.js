export async function generateMetadata({ params }) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/${params.slug}`,
      { cache: "no-store" }
    );

    const news = await res.json();

    return {
      title: news?.title || "Rajyavani News",
      description: news?.content?.slice(0,150) || "Latest Marathi News"
    };

  } catch (error) {

    return {
      title: "Rajyavani News",
      description: "Latest Marathi News"
    };

  }

}

export default async function NewsPage({ params }) {

  let news = null;

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/${params.slug}`,
      { cache: "no-store" }
    );

    news = await res.json();

  } catch (error) {

    console.error("News fetch error:", error);

  }

  if (!news) {
    return (
      <div style={{padding:"40px"}}>
        <h1>News not found</h1>
      </div>
    );
  }

  return (

    <div style={{maxWidth:"900px",margin:"40px auto"}}>

      <h1>{news.title}</h1>

      <p style={{color:"gray"}}>
        {news.author} • {new Date(news.createdAt).toLocaleDateString()}
      </p>

      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          style={{width:"100%",margin:"20px 0"}}
        />
      )}

      <p style={{lineHeight:"1.8"}}>
        {news.content}
      </p>

    </div>

  );

}