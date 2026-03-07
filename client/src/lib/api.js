import axios from "axios"

const API="http://localhost:5000/api"

export const getLatestNews=async()=>{

const res=await axios.get(`${API}/news/latest`)
return res.data

}

export const getTrendingNews=async()=>{

const res=await axios.get(`${API}/news/trending`)
return res.data

}

export const getBreakingNews=async()=>{

const res=await axios.get(`${API}/news/breaking`)
return res.data

}

export const getFeaturedNews=async()=>{

const res=await axios.get(`${API}/news/featured`)
return res.data

}

export const getNewsBySlug=async(slug)=>{

const res=await axios.get(`${API}/news/${slug}`)
return res.data

}

export const getNewsByCategory=async(slug)=>{

const res=await axios.get(`${API}/news/category/${slug}`)
return res.data

}