"use client";

import { useEffect, useState } from "react";
import { addComment, getComments } from "@/lib/api";

export default function Comments({ newsId }) {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {

    const loadComments = async () => {

      try{
        const res = await getComments(newsId);
        setComments(res.data);
      }catch(err){
        console.error(err);
      }

    };

    loadComments();

  }, [newsId]);



  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!text) return;

    try{

      const res = await addComment({
        newsId,
        text
      });

      setComments([res.data, ...comments]);
      setText("");

    }catch(err){
      console.error(err);
    }

  };



  return (

    <div className="comments">

      <h2>Comments</h2>

      <form onSubmit={handleSubmit} className="comment-form">

        <textarea
          placeholder="Write your comment..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />

        <button type="submit">
          Post Comment
        </button>

      </form>



      <div className="comment-list">

        {comments.map((c)=>(
          <div key={c._id} className="comment">

            <p className="comment-text">
              {c.text}
            </p>

            <span className="comment-date">
              {new Date(c.createdAt).toLocaleDateString()}
            </span>

          </div>
        ))}

      </div>

    </div>

  );

}