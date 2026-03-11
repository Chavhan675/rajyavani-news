import "./globals.css"
import Header from "../components/Header"
import BreakingNews from "../components/BreakingNews"
import Footer from "../components/Footer"

export const metadata = {
 title:"राज्यवाणी - Marathi News",
 description:"Latest Marathi news portal"
}

export default function RootLayout({children}){

 return(

  <html lang="mr">

   <body className="bg-gray-100">

    <Header />

    <BreakingNews />

    <main className="max-w-7xl mx-auto px-4 py-6">
     {children}
    </main>

    <Footer />

   </body>

  </html>

 )

}