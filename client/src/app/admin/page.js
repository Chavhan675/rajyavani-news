"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminNews, deleteNews } from "@/lib/api";

export default function AdminDashboard() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    const loadNews = async () => {
      try{
        const res = await getAdminNews();
        setNews(res.data);
      }catch(err){
        console.error(err);
      }
    };

    loadNews();

  }, []);



  const handleDelete = async (id) => {

    if(!confirm("Delete this news?")) return;

    try{

      await deleteNews(id);

      setNews(news.filter(n => n._id !== id));

    }catch(err){
      console.error(err);
    }

  };



  return (

    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      <Link href="/admin/create-news" className="create-btn">
        + Create News
      </Link>


      <div className="admin-news-list">

        {news.map((item)=>(

          <div key={item._id} className="admin-news-card">

            <h3>{item.title}</h3>

            <p>{item.category}</p>

            <div className="admin-actions">

              <Link href={`/news/${item.slug}`}>
                View
              </Link>

              <button
                onClick={()=>handleDelete(item._id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}