"use client"

import { useEffect, useState } from "react"
import api from "../../../lib/api"

export default function AdminDashboard() {

  const [data, setData] = useState(null)

  useEffect(() => {

    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics/dashboard")
        setData(res.data)
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      }
    }

    fetchAnalytics()

  }, [])

  if (!data) {
    return (
      <div className="text-center py-20">
        Loading Dashboard...
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white shadow p-6">
          <h2 className="text-xl font-bold">Total News</h2>
          <p className="text-3xl mt-2">{data.totalNews}</p>
        </div>

        <div className="bg-white shadow p-6">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-3xl mt-2">{data.totalUsers}</p>
        </div>

        <div className="bg-white shadow p-6">
          <h2 className="text-xl font-bold">Comments</h2>
          <p className="text-3xl mt-2">{data.totalComments}</p>
        </div>

        <div className="bg-white shadow p-6">
          <h2 className="text-xl font-bold">Total Views</h2>
          <p className="text-3xl mt-2">{data.totalViews}</p>
        </div>

      </div>

      <h2 className="text-2xl font-bold mb-4">
        Trending News
      </h2>

      <div className="space-y-4">
        {data.trendingNews?.map(news => (
          <div key={news._id} className="border p-4">
            <h3 className="font-bold">{news.title}</h3>
            <p className="text-gray-500">
              Views: {news.views}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}