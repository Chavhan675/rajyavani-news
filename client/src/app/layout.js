import "./globals.css"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BreakingNews from "../components/BreakingNews"

export const metadata = {
title: "राज्यवाणी | Marathi News Portal",
description: "Latest Marathi News"
}

export default function RootLayout({ children }) {

return (

<html lang="en">

<body className="bg-gray-100">

<Navbar />

<BreakingNews />

<main className="max-w-7xl mx-auto px-4 py-6">

{children}

</main>

<Footer />

</body>

</html>

)

}