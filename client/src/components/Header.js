"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header(){

 const [menuOpen,setMenuOpen] = useState(false)

 const today = new Date().toLocaleDateString("mr-IN",{
  weekday:"long",
  year:"numeric",
  month:"long",
  day:"numeric"
 })

 return(

  <header className="w-full shadow-md">

   {/* TOP BAR */}

   <div className="bg-gray-100 text-sm text-gray-700">

    <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

     <span>{today}</span>

     <div className="flex gap-4">

      <Link href="/login" className="hover:text-red-600">
       Login
      </Link>

      <Link href="/register" className="hover:text-red-600">
       Register
      </Link>

     </div>

    </div>

   </div>



   {/* LOGO + SEARCH */}

   <div className="bg-white border-b">

    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

     <Link
      href="/"
      className="text-3xl font-bold text-red-600 tracking-wide"
     >
      राज्यवाणी
     </Link>

     <form action="/search" className="hidden md:flex">

      <input
       type="text"
       name="q"
       placeholder="Search news..."
       className="border px-3 py-2 rounded-l outline-none"
      />

      <button
       type="submit"
       className="bg-red-600 text-white px-4 rounded-r hover:bg-red-700"
      >
       Search
      </button>

     </form>



     <button
      className="md:hidden text-2xl"
      onClick={()=>setMenuOpen(!menuOpen)}
     >
      ☰
     </button>

    </div>

   </div>



   {/* MAIN CATEGORY NAVBAR */}

   <nav className="bg-red-600 text-white">

    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-3 text-sm font-semibold">

     <Link href="/" className="px-4 py-1 bg-white text-red-600 rounded-full hover:bg-black hover:text-white">
      Home
     </Link>

     <Link href="/category/maharashtra" className="px-4 py-1 bg-white text-red-600 rounded-full hover:bg-black hover:text-white">
      Maharashtra
     </Link>

     <Link href="/category/politics" className="px-4 py-1 bg-white text-red-600 rounded-full hover:bg-black hover:text-white">
      Politics
     </Link>

     <Link href="/category/sports" className="px-4 py-1 bg-white text-red-600 rounded-full hover:bg-black hover:text-white">
      Sports
     </Link>

     <Link href="/category/technology" className="px-4 py-1 bg-white text-red-600 rounded-full hover:bg-black hover:text-white">
      Technology
     </Link>

     <Link href="/category/entertainment" className="px-4 py-1 bg-white text-red-600 rounded-full hover:bg-black hover:text-white">
      Entertainment
     </Link>

    </div>

   </nav>



   {/* SECONDARY NAVBAR */}

   <div className="bg-red-700 text-white">

    <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-center gap-4 text-sm">

     <Link href="/trending" className="hover:underline">
      Trending
     </Link>

     <Link href="/search" className="hover:underline">
      Search
     </Link>

     <Link href="/comments" className="hover:underline">
      Comments
     </Link>

     <Link href="/admin" className="hover:underline">
      Admin Dashboard
     </Link>

     <Link href="/admin/create" className="hover:underline">
      Create News
     </Link>

     <Link href="/earning" className="hover:underline">
      Earning
     </Link>

     <Link href="/ad-banner" className="hover:underline">
      Ad Banner
     </Link>
     <Link href="/admin/dashboard">
 Dashboard
</Link>

    </div>

   </div>



   {/* MOBILE MENU */}

   {menuOpen && (

    <div className="md:hidden bg-red-600 text-white px-4 py-4 space-y-2">

     <Link href="/" className="block">Home</Link>
     <Link href="/category/maharashtra" className="block">Maharashtra</Link>
     <Link href="/category/politics" className="block">Politics</Link>
     <Link href="/category/sports" className="block">Sports</Link>
     <Link href="/category/technology" className="block">Technology</Link>
     <Link href="/category/entertainment" className="block">Entertainment</Link>
     <Link href="/trending" className="block">Trending</Link>
     <Link href="/search" className="block">Search</Link>
     <Link href="/comments" className="block">Comments</Link>
     <Link href="/admin" className="block">Admin</Link>
     <Link href="/admin/create" className="block">Create News</Link>
     <Link href="/earning" className="block">Earning</Link>
     <Link href="/ad-banner" className="block">Ad Banner</Link>

    </div>

   )}

  </header>

 )

}