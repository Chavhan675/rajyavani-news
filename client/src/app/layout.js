import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreakingNews from "@/components/BreakingNews";

export const metadata = {
  title: "Rajyavani - Marathi News Portal",
  description:
    "Rajyavani delivers latest Marathi news from Maharashtra, politics, sports, technology and more.",
  keywords:
    "Marathi news, Maharashtra news, politics news, sports news, technology news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mr">
      <body>

        <Navbar />
        <BreakingNews />

        <main className="container">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}