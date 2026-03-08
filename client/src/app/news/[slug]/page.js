import { getNewsBySlug } from "@/lib/api";

export async function generateMetadata({ params }) {

  const article = await getNewsBySlug(params.slug);

  return {
    title: article?.title || "Rajyavani",
    description: article?.content?.slice(0,150) || "Latest Marathi News"
  };

}

export default async function NewsPage({ params }) {

  const article = await getNewsBySlug(params.slug);

  if (!article) {
    return <div>News not found</div>;
  }

  return (

    <div style={{maxWidth:"900px",margin:"40px auto"}}>

      <h1>{article.title}</h1>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={{width:"100%",margin:"20px 0"}}
        />
      )}

      <p>{article.content}</p>

    </div>

  );

}