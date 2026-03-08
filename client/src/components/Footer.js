import Link from "next/link";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* Logo + About */}

        <div className="footer-about">

          <h2>Rajyavani</h2>

          <p>
            Rajyavani is a Marathi news platform delivering
            latest updates on Maharashtra, politics, sports,
            technology and more.
          </p>

        </div>


        {/* Categories */}

        <div className="footer-links">

          <h3>Categories</h3>

          <Link href="/category/maharashtra">महाराष्ट्र</Link>
          <Link href="/category/india">भारत</Link>
          <Link href="/category/politics">राजकारण</Link>
          <Link href="/category/sports">क्रीडा</Link>
          <Link href="/category/technology">टेक</Link>

        </div>


        {/* Pages */}

        <div className="footer-links">

          <h3>Pages</h3>

          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>

        </div>

      </div>


      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Rajyavani News.
          All rights reserved.
        </p>

      </div>

    </footer>

  );
}