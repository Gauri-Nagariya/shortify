<body>
  <h1>SHORTIFY: URL Shortener Project</h1>
  <p>
    A full-stack URL shortener application built with the MERN stack (MongoDB, Express, React, Node.js). Users can shorten URLs, generate QR codes, copy and download them, with secure login/logout functionality.
  </p>
   <a href="https://shortify-two.vercel.app" class="live-link" target="_blank">View Live Demo</a>

  <h2>Features</h2>
  <ul>
    <li>User authentication: <strong>Login</strong> and <strong>Logout</strong>.</li>
    <li>Shorten long URLs using <code>nanoid</code>.</li>
    <li>Generate QR codes for each shortened URL using <code>qrcode.react</code> library.</li>
    <li>Copy shortened URLs to the clipboard.</li>
    <li>Download QR codes as images.</li>
    <li>Responsive and clean UI built with Bootstrap.</li>
    <!-- <li>View a list of all shortened URLs for the logged-in user.</li> -->
  </ul>

  <h2>Technologies Used</h2>
  <ul>
    <li>Frontend: React, Bootstrap, qrcode.react</li>
    <li>Backend: Node.js, Express</li>
    <li>Database: MongoDB</li>
    <li>URL Shortening: nanoid</li>
  </ul>

  <h2>Installation</h2>
  <p>Steps to set up the project locally:</p>
  <ul>
    <li>Clone the repository: <code>git clone &lt;repository-url&gt;</code></li>
    <li>Navigate to the project folder: <code>cd url-shortener</code></li>
    <li>Install dependencies:
      <ul>
        <li>Server: <code>npm install</code> in the <code>backend</code> folder</li>
        <li>Client: <code>npm install</code> in the <code>frontend</code> folder</li>
      </ul>
    </li>
    <li>Create a <code>.env</code> file in the server folder with your MongoDB connection string:
      <pre>
MONGO_URI=your_mongodb_connection_string
PORT=4000
      </pre>
    </li>
    <li>Start the servers:
      <ul>
        <li>backend: <code>npm start</code></li>
        <li>frontend: <code>npm run dev</code></li>
      </ul>
    </li>
  </ul>

  <h2>Usage</h2>
  <ul>
    <li>Register a new account or login.</li>
    <li>Enter a long URL to shorten it.</li>
    <li>Copy the generated short URL using the copy button.</li>
    <li>Generate a QR code for the shortened URL.</li>
    <li>Download the QR code as an image.</li>
    <li>Logout when done.</li>
  </ul>

  <h2>Folder Structure</h2>
  <pre>
shortify/
├── frontend/      # React frontend
├── backend/      # Express backend
├── README.md
  </pre>

  <h2>License</h2>
  <p>MIT License</p>
</body>

