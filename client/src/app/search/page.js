"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"

export default function Search(){

  const [query,setQuery] = useState("")

  return(

    <div className="container">

      <h2>Search News</h2>

      <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
      />

    </div>

  )

}