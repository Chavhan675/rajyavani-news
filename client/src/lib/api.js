import axios from "axios"

const API = axios.create({
  baseURL: "https://rajyavani-news.onrender.com/api"
})

export default API