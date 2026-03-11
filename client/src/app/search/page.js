"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import api from "../../services/api"
import NewsCard from "../../components/NewsCard"

function SearchContent() {

  const params = useSearchParams()
  const query = params.get("q")

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const res = await api.get(`/api/search?q=${query}`)
        setResults(res.data || [])

      } catch (err) {

        console.error("Search error:", err)

      } finally {

        setLoading(false)

      }

    }

    if (query) {
      fetchResults()
    }

  }, [query])

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Searching news...
      </div>
    )
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-6">
        Search results for: {query}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {results.length > 0 ? (

          results.map(item => (
            <NewsCard key={item._id} news={item} />
          ))

        ) : (

          <p>No news found.</p>

        )}

      </div>

    </div>

  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  )
}