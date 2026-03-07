import Link from "next/link"

export default function HeroSlider({news}){

if(!news || news.length === 0) return null

const featured = news[0]

return(

<div className="mb-6">

<div className="relative">

<img
src={featured.image ? `http://localhost:5000/uploads/${featured.image}` : "https://via.placeholder.com/1200x400"}
className="w-full h-[300px] object-cover rounded"
/>

<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">

<Link href={`/news/${featured.slug}`}>
<h2 className="text-3xl font-bold">
{featured.title}
</h2>
</Link>

</div>

</div>

</div>

)

}