<h1 align="center">🔗 Shortify - URL Shortener with QR Code</h1>

<p align="center">
A full-stack <strong>MERN</strong> app to shorten URLs and generate downloadable <strong>QR codes</strong>.  
Built using <strong>MongoDB, Express, React, and Node.js</strong>.
</p>

<p align="center">
  🚀 <a href="https://shortify-two.vercel.app/" target="_blank"><strong>Live Demo</strong></a> 
  <!-- ⚙️ <a href="https://shortify-backend.onrender.com/" target="_blank"><strong>API</strong></a> -->
</p>

<hr />

<h2>✨ Features</h2>
<ul>
  <li>🔗 Shorten long URLs easily</li>
  <li>📱 Generate and download QR codes for each link</li>
  <li>🔑 Simple authentication (login/signup)</li>
  <li>🌍 Redirect instantly via unique short codes</li>
</ul>

<hr />

<h2>🧩 Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React (Vite), Axios, qrcode.react</li>
  <li><strong>Backend:</strong> Express.js, Mongoose, nanoid</li>
  <li><strong>Database:</strong> MongoDB Atlas</li>
  <li><strong>Deploy:</strong> Vercel + Render</li>
</ul>

<hr />

<h2>⚙️ Quick Setup</h2>

<h3>Backend (.env)</h3>
<pre>
PORT=4000
MONGO_URI=your-mongodb-url
BACKEND_URL=https://shortify-backend.onrender.com
</pre>

<h3>Frontend (.env)</h3>
<pre>
VITE_BACKEND_URL=https://shortify-backend.onrender.com
</pre>

<hr />

<h2>📦 Install & Run</h2>
<pre>
# Clone
git clone https://github.com/Gauri-Nagariya/shortify.git

# Backend
cd backend
npm install && npm run dev

# Frontend
cd ../frontend
npm install && npm run dev
</pre>

<!-- <hr />

<h2>🧾 QR Code Example</h2>
<pre><code class="language-javascript">
// src/components/QrGenerator.jsx
import { QRCodeCanvas } from "qrcode.react";

const QrGenerator = ({ shortUrl }) => (
  &lt;div&gt;
    &lt;QRCodeCanvas id="qr" value={shortUrl} size={150} /&gt;
    &lt;button onClick={() =&gt; {
      const url = document.getElementById("qr").toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "shortify-qr.png";
      a.click();
    }}&gt;Download&lt;/button&gt;
  &lt;/div&gt;
);
</code></pre> -->

<hr />

<!-- <h2>🌐 Live</h2>
<p><strong>Frontend:</strong> 
  <a href="https://shortify-two.vercel.app/" target="_blank">shortify-two.vercel.app</a>
</p>
<p><strong>Backend:</strong> 
  <a href="https://shortify-backend.onrender.com/" target="_blank">shortify-backend.onrender.com</a>
</p>

<hr /> -->

<h2>👩‍💻 Author</h2>
<p>
  <strong>Gauri Nagariya</strong><br/>
  🌐 <a href="https://github.com/Gauri-Nagariya" target="_blank">GitHub</a> |
  💫 <a href="https://shortify-two.vercel.app/" target="_blank">Live App</a>
</p>
