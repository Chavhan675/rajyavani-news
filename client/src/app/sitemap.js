export default async function sitemap(){

 const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

 const newsRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/news")
 const news = await newsRes.json()

 const newsUrls = news.map((item)=>({
  url: `${baseUrl}/news/${item.slug}`,
  lastModified: new Date(item.updatedAt || item.createdAt),
  changeFrequency: "daily",
  priority: 0.8
 }))

 return [
  {
   url: baseUrl,
   lastModified: new Date(),
   changeFrequency: "daily",
   priority: 1
  },
  ...newsUrls
 ]

}