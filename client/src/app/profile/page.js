// ===================================================================================================================
// FILE LOCATION: client/src/app/profile/page.js
// PROJECT: RAJYAVANI NEWS PLATFORM
// PURPOSE: USER PROFILE PAGE
// ===================================================================================================================
// DESCRIPTION
// This page allows the user to view and update their profile information.
//
// CONNECTED FILES
// client/src/context/AuthContext.js
// client/src/lib/api.js
// client/src/app/dashboard/page.js
//
// FEATURES
// - View user information
// - Update name
// - Update bio
// - Update website
// - Authentication protection
//
// ===================================================================================================================

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "../../context/AuthContext"
import { updateProfile } from "../../lib/api"



export default function ProfilePage() {

    const router = useRouter()

    const { user, loading, refreshUser } = useAuth()

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        website: ""
    })

    const [message, setMessage] = useState("")
    const [saving, setSaving] = useState(false)



    // ===============================================================================================================
    // LOAD USER DATA
    // ===============================================================================================================

    useEffect(() => {

        if (!loading && !user) {

            router.push("/login")

        }

        if (user) {

            setFormData({
                name: user.name || "",
                bio: user.bio || "",
                website: user.website || ""
            })

        }

    }, [user, loading])



    // ===============================================================================================================
    // HANDLE INPUT CHANGE
    // ===============================================================================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        })

    }



    // ===============================================================================================================
    // HANDLE FORM SUBMIT
    // ===============================================================================================================

    const handleSubmit = async (e) => {

        e.preventDefault()

        setSaving(true)
        setMessage("")

        try {

            await updateProfile(formData)

            await refreshUser()

            setMessage("Profile updated successfully")

        } catch (error) {

            setMessage("Profile update failed")

        } finally {

            setSaving(false)

        }

    }



    if (loading || !user) {

        return (

            <div className="text-center py-20">

                Loading profile...

            </div>

        )

    }



    return (

        <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-6">

                Your Profile

            </h1>



            {message && (

                <p className="text-sm text-blue-600 mb-4">

                    {message}

                </p>

            )}



            <form onSubmit={handleSubmit} className="space-y-4">



                {/* NAME */}

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border px-3 py-2 rounded"
                />



                {/* BIO */}

                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Short bio"
                    rows={3}
                    className="w-full border px-3 py-2 rounded"
                />



                {/* WEBSITE */}

                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website URL"
                    className="w-full border px-3 py-2 rounded"
                />



                {/* SAVE BUTTON */}

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >

                    {saving ? "Saving..." : "Save Changes"}

                </button>

            </form>

        </div>

    )

}



// ===================================================================================================================
// END OF FILE
// ===================================================================================================================