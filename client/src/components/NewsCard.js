import Link from "next/link"

export default function NewsCard({news}){

 return(

  <Link href={`/news/${news.slug}`}>

   <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">

    {news.image &&(

     <img
      src={`http://localhost:5000/uploads/${news.image}`}
      className="w-full h-48 object-cover"
     />

    )}

    <div className="p-4">

     <h3 className="font-bold text-lg">
      {news.title}
     </h3>

    </div>

   </div>

  </Link>

 )

}