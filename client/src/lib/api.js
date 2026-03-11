import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

// get profile
export const getProfile = async () => {
  const token = localStorage.getItem("token")

  return api.get("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default api