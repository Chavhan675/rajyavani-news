import Link from "next/link"

export default function Footer(){

return(

<footer className="footer">

<div className="footer-container">

<div className="footer-col">

<h2 className="footer-logo">राज्यवाणी</h2>

<p>
राज्यवाणी हे एक आधुनिक मराठी न्यूज पोर्टल आहे जे महाराष्ट्र
आणि भारतातील ताज्या बातम्या वाचकांपर्यंत पोहोचवते.
</p>

<div className="social">

<span>📘</span>
<span>🐦</span>
<span>▶</span>
<span>💬</span>

</div>

</div>

<div className="footer-col">

<h3>Categories</h3>

<Link href="/category/maharashtra">महाराष्ट्र</Link>
<Link href="/category/politics">राजकारण</Link>
<Link href="/category/sports">क्रीडा</Link>
<Link href="/category/business">व्यवसाय</Link>
<Link href="/category/technology">तंत्रज्ञान</Link>

</div>

<div className="footer-col">

<h3>Quick Links</h3>

<Link href="/">Home</Link>
<Link href="/login">Login</Link>
<Link href="/signup">Signup</Link>
<Link href="/submit-news">Submit News</Link>
<Link href="/dashboard">Dashboard</Link>

</div>

<div className="footer-col">

<h3>Contact</h3>

<p>Email: rajyavani.news@gmail.com</p>
<p>Phone: +91 0000000000</p>
<p>Maharashtra, India</p>

</div>

</div>

<div className="footer-bottom">

© 2026 Rajyavani Marathi News Portal

</div>

</footer>

)

}