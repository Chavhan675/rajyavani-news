"use client"

import { useEffect,useState } from "react"
import api from "../services/api"

export default function Comments({newsId}){

 const [comments,setComments] = useState([])
 const [name,setName] = useState("")
 const [message,setMessage] = useState("")

 useEffect(()=>{

  const fetchComments = async ()=>{

   try{

    const res = await api.get(`/comments/${newsId}`)

    setComments(res.data)

   }catch(err){
    console.error(err)
   }

  }

  fetchComments()

 },[newsId])


 const submitComment = async e =>{

  e.preventDefault()

  try{

   const res = await api.post("/comments",{
    name,
    message,
    news:newsId
   })

   setComments([res.data,...comments])

   setName("")
   setMessage("")

  }catch(err){
   console.error(err)
  }

 }

 return(

  <div className="mt-10">

   <h3 className="text-xl font-bold mb-4">
    Comments
   </h3>


   {/* COMMENT FORM */}

   <form
    onSubmit={submitComment}
    className="space-y-3 mb-6"
   >

    <input
     type="text"
     placeholder="Your name"
     value={name}
     onChange={e=>setName(e.target.value)}
     className="border p-2 w-full"
     required
    />

    <textarea
     placeholder="Write a comment..."
     value={message}
     onChange={e=>setMessage(e.target.value)}
     className="border p-2 w-full"
     required
    />

    <button
     className="bg-red-600 text-white px-4 py-2 rounded"
    >
     Post Comment
    </button>

   </form>


   {/* COMMENTS LIST */}

   <div className="space-y-4">

    {comments.map(c=>(
     <div
      key={c._id}
      className="bg-white p-3 rounded shadow"
     >

      <p className="font-semibold">
       {c.name}
      </p>

      <p className="text-sm text-gray-600">
       {c.message}
      </p>

     </div>
    ))}

   </div>

  </div>

 )

}