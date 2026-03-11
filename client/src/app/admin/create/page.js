"use client"

import { useState } from "react"
import api from "../../../lib/api"

export default function CreateNewsPage() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/news", {
        title,
        content,
        category
      })

      alert("News created successfully")

      setTitle("")
      setContent("")
      setCategory("")

    } catch (err) {
      console.error(err)
      alert("Error creating news")
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-20">

      <h1 className="text-3xl font-bold mb-6">
        Create News Article
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2"
          required
        />

        <textarea
          placeholder="News Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border w-full p-2 h-40"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border w-full p-2"
          required
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2"
        >
          Publish News
        </button>

      </form>

    </div>
  )
}