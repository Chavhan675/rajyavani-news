"use client";

import { useState } from "react";
import { createNews } from "@/lib/api";

export default function CreateNewsPage() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("content", content);

    try {

      await createNews(formData);

      alert("News published successfully");

      setTitle("");
      setCategory("");
      setContent("");
      setImage(null);

    } catch (err) {

      console.error(err);
      alert("Error publishing news");

    }

  };

  return (

    <div className="admin-page">

      <h1>Create News</h1>

      <form onSubmit={handleSubmit} className="news-form">

        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <textarea
          placeholder="News Content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />

        <button type="submit">
          Publish News
        </button>

      </form>

    </div>

  );

}