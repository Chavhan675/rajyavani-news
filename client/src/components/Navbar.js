"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar(){

 const [menuOpen,setMenuOpen] = useState(false)

 return(

  <header className="bg-red-600 text-white shadow">

   {/* TOP BAR */}

   <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

    <Link href="/" className="text-2xl font-bold">
     राज्यवाणी
    </Link>

    <button
     className="md:hidden"
     onClick={()=>setMenuOpen(!menuOpen)}
    >
     ☰
    </button>

    <nav className="hidden md:flex gap-6 text-sm font-semibold">

     <Link href="/">मुख्य</Link>
     <Link href="/category/maharashtra">महाराष्ट्र</Link>
     <Link href="/category/politics">राजकारण</Link>
     <Link href="/category/sports">क्रीडा</Link>
     <Link href="/category/technology">तंत्रज्ञान</Link>
     <Link href="/category/entertainment">मनोरंजन</Link>

    </nav>

   </div>

   {/* MOBILE MENU */}

   {menuOpen && (

    <div className="md:hidden bg-red-700 px-4 py-3 space-y-3">

     <Link href="/" className="block">मुख्य</Link>
     <Link href="/category/maharashtra" className="block">महाराष्ट्र</Link>
     <Link href="/category/politics" className="block">राजकारण</Link>
     <Link href="/category/sports" className="block">क्रीडा</Link>
     <Link href="/category/technology" className="block">तंत्रज्ञान</Link>
     <Link href="/category/entertainment" className="block">मनोरंजन</Link>

    </div>

   )}

  </header>

 )
}