import axios from "axios"

const API = axios.create({
  baseURL: "https://rajyavani-news.onrender.com"
})

export default API