import Link from "next/link"

export default function NewsCard({news}){

return(

<div className="news-card">

<img
className="news-image"
src={news.image ? `http://localhost:5000/uploads/${news.image}` : "https://via.placeholder.com/400x200"}
alt={news.title}
/>

<div className="news-content">

<Link href={`/news/${news.slug}`} className="news-title">
{news.title}
</Link>

<div className="news-date">
🕒 {new Date(news.createdAt).toLocaleDateString()}
</div>

</div>

</div>

)

}