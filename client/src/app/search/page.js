"use client";

import { useState } from "react";
import { searchNews } from "@/lib/api";
import NewsCard from "@/components/NewsCard";

export default function SearchPage() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {

    e.preventDefault();

    if(!query) return;

    try{

      const res = await searchNews(query);
      setResults(res.data);

    }catch(err){
      console.error(err);
    }

  };

  return (

    <div className="search-page">

      <h1>Search News</h1>

      <form onSubmit={handleSearch} className="search-form">

        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />

        <button type="submit">
          Search
        </button>

      </form>


      <div className="news-grid">

        {results.map((news)=>(
          <NewsCard key={news._id} news={news}/>
        ))}

      </div>

    </div>

  );

}