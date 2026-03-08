"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link href="/" className="logo">
          Rajyavani
        </Link>


        {/* Desktop Menu */}

        <nav className="nav-links">

          <Link href="/category/maharashtra">महाराष्ट्र</Link>
          <Link href="/category/india">भारत</Link>
          <Link href="/category/politics">राजकारण</Link>
          <Link href="/category/sports">क्रीडा</Link>
          <Link href="/category/technology">टेक</Link>

        </nav>


        {/* Right side */}

        <div className="nav-right">

          <Link href="/search">🔍</Link>

          <Link href="/login" className="login-btn">
            Login
          </Link>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

      </div>


      {/* Mobile Menu */}

      {menuOpen && (
        <div className="mobile-nav">

          <Link href="/category/maharashtra">महाराष्ट्र</Link>
          <Link href="/category/india">भारत</Link>
          <Link href="/category/politics">राजकारण</Link>
          <Link href="/category/sports">क्रीडा</Link>
          <Link href="/category/technology">टेक</Link>

        </div>
      )}

    </header>
  );
}