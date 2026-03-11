"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "../../lib/api"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await api.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)

      alert("Login successful")

      router.push("/")

    } catch (err) {

      console.error("Login error:", err)

      alert(err.response?.data?.message || "Login failed")

    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg p-8 w-[400px] rounded">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <button
            type="submit"
            className="bg-red-600 text-white w-full py-2"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}