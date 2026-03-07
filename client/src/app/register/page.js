// ===================================================================================================================
// FILE LOCATION: client/src/app/register/page.js
// PROJECT: RAJYAVANI NEWS PLATFORM
// PURPOSE: USER REGISTRATION PAGE
// ===================================================================================================================
// DESCRIPTION
// This page allows new users to create an account on the Rajyvani platform.
//
// CONNECTED FILES
// client/src/context/AuthContext.js
// client/src/lib/api.js
// client/src/app/login/page.js
// client/src/app/dashboard/page.js
//
// FEATURES
// - Name input
// - Email input
// - Password input
// - Confirm password
// - Error handling
// - Loading state
// - Redirect after registration
//
// ===================================================================================================================

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "../../context/AuthContext"

import Link from "next/link"



export default function RegisterPage() {

    const router = useRouter()

    const { register } = useAuth()



    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })



    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }



    const handleSubmit = async (e) => {

        e.preventDefault()

        setError("")



        if (formData.password !== formData.confirmPassword) {

            setError("Passwords do not match")

            return

        }



        setLoading(true)



        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        })



        if (result.success) {

            router.push("/dashboard")

        } else {

            setError(result.message || "Registration failed")

        }



        setLoading(false)

    }



    return (

        <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-6 text-center">

                Create Rajyvani Account

            </h1>



            {error && (

                <p className="text-red-600 text-sm mb-4">

                    {error}

                </p>

            )}



            <form onSubmit={handleSubmit} className="space-y-4">



                {/* NAME */}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                />



                {/* EMAIL */}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                />



                {/* PASSWORD */}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                />



                {/* CONFIRM PASSWORD */}

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                />



                {/* SUBMIT BUTTON */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >

                    {loading ? "Creating Account..." : "Register"}

                </button>

            </form>



            <p className="text-sm text-center mt-4">

                Already have an account?{" "}

                <Link href="/login" className="text-red-600">

                    Login

                </Link>

            </p>

        </div>

    )

}



// ===================================================================================================================
// END OF FILE
// ===================================================================================================================