"use client"

export default function ArticleSEO({news}){

 if(!news){
  return null
 }

 const schema = {
  "@context":"https://schema.org",
  "@type":"NewsArticle",
  headline:news.title,
  description:news.description,
  image:[
   `http://localhost:5000/uploads/${news.image}`
  ],
  datePublished:news.createdAt,
  dateModified:news.updatedAt || news.createdAt,
  author:{
   "@type":"Person",
   name:news.author?.name || "Rajyavani"
  },
  publisher:{
   "@type":"Organization",
   name:"Rajyavani",
   logo:{
    "@type":"ImageObject",
    url:"http://localhost:3000/logo.png"
   }
  },
  mainEntityOfPage:{
   "@type":"WebPage",
   "@id":`http://localhost:3000/news/${news.slug}`
  }
 }

 return(

  <script
   type="application/ld+json"
   dangerouslySetInnerHTML={{
    __html:JSON.stringify(schema)
   }}
  />

 )

}