"use client";

import { useState, useEffect } from "react";

export default function SubmitForm(){

const [title,setTitle] = useState("");
const [content,setContent] = useState("");
const [category,setCategory] = useState("");
const [image,setImage] = useState(null);
const [categories,setCategories] = useState([]);
const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");

useEffect(()=>{

fetch("http://localhost:5000/api/news/categories")
.then(res=>res.json())
.then(data=>setCategories(data))
.catch(()=>setCategories([]));

},[]);

const handleSubmit = async (e) => {

e.preventDefault();

setLoading(true);
setMessage("");

const formData = new FormData();

formData.append("title",title);
formData.append("content",content);
formData.append("category",category);
formData.append("image",image);

try{

const res = await fetch("http://localhost:5000/api/news/submit",{
method:"POST",
body:formData
});

const data = await res.json();

if(res.ok){
setMessage("News submitted successfully.");
setTitle("");
setContent("");
setCategory("");
setImage(null);
}else{
setMessage(data.message || "Error submitting news.");
}

}catch(err){
setMessage("Server error.");
}

setLoading(false);

};

return(

<div className="container">

<div style={{
maxWidth:"800px",
margin:"40px auto",
background:"white",
padding:"30px",
borderRadius:"8px"
}}>

<h2 style={{marginBottom:"20px"}}>
Submit News
</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="News Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
style={{
width:"100%",
padding:"12px",
marginBottom:"15px",
border:"1px solid #ddd"
}}
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
required
style={{
width:"100%",
padding:"12px",
marginBottom:"15px",
border:"1px solid #ddd"
}}
>

<option value="">Select Category</option>

{categories.map(cat=>(
<option key={cat._id} value={cat._id}>
{cat.name}
</option>
))}

</select>

<textarea
placeholder="Write full news content..."
value={content}
onChange={(e)=>setContent(e.target.value)}
required
rows="10"
style={{
width:"100%",
padding:"12px",
marginBottom:"15px",
border:"1px solid #ddd"
}}
></textarea>

<input
type="file"
accept="image/*"
onChange={(e)=>setImage(e.target.files[0])}
required
style={{
marginBottom:"20px"
}}
/>

<button
type="submit"
disabled={loading}
style={{
background:"#e4002b",
color:"white",
padding:"12px 25px",
border:"none",
cursor:"pointer",
fontWeight:"600"
}}
>

{loading ? "Submitting..." : "Submit News"}

</button>

</form>

{message && (

<p style={{
marginTop:"15px",
color:"green"
}}>
{message}
</p>

)}

</div>

</div>

);

}