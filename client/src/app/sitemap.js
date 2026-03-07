export default async function sitemap(){

const API="http://localhost:5000/api"

const res=await fetch(`${API}/news/latest`)

const news=await res.json()

const newsUrls=news.map(n=>({

url:`http://localhost:3000/news/${n.slug}`,
lastModified:new Date()

}))

return [

{
url:"http://localhost:3000",
lastModified:new Date()
},

...newsUrls

]

}