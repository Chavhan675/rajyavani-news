import Link from "next/link"

export default function Footer(){

 return (

  <footer className="bg-gray-900 text-gray-300 mt-10">

   <div className="max-w-7xl mx-auto px-4 py-10">

    <div className="grid md:grid-cols-3 gap-8">

     <div>

      <h2 className="text-xl font-bold text-white mb-4">
       राज्यवाणी
      </h2>

      <p className="text-sm">
       महाराष्ट्र आणि भारतातील ताज्या बातम्या, राजकारण,
       क्रिकेट, तंत्रज्ञान आणि मनोरंजन बातम्या.
      </p>

     </div>

     <div>

      <h3 className="text-lg font-semibold text-white mb-3">
       Useful Links
      </h3>

      <ul className="space-y-2">

       <li>
        <Link href="/" className="hover:text-white">
         Home
        </Link>
       </li>

       <li>
        <Link href="/category/politics" className="hover:text-white">
         Politics
        </Link>
       </li>

       <li>
        <Link href="/category/cricket" className="hover:text-white">
         Cricket
        </Link>
       </li>

       <li>
        <Link href="/category/technology" className="hover:text-white">
         Technology
        </Link>
       </li>

      </ul>

     </div>

     <div>

      <h3 className="text-lg font-semibold text-white mb-3">
       Follow Us
      </h3>

      <ul className="space-y-2">

       <li>
        <a href="#" className="hover:text-white">
         Facebook
        </a>
       </li>

       <li>
        <a href="#" className="hover:text-white">
         Twitter
        </a>
       </li>

       <li>
        <a href="#" className="hover:text-white">
         Instagram
        </a>
       </li>

      </ul>

     </div>

    </div>

    <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">

     © {new Date().getFullYear()} राज्यवाणी. All rights reserved.

    </div>

   </div>

  </footer>

 )

}