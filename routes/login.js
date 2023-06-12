const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.send(`
    <html>
      <body>
        <form id="loginForm" action="/chat" method="GET">
          <input type="text" id="username" placeholder="Enter username" required>
          <button type="submit">Login</button>
        </form>
        <script>
          document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            localStorage.setItem("username", username);
            window.location.href = "/chat?username=" + encodeURIComponent(username);
          });
        </script>
      </body>
    </html>
  `);
});

module.exports = router;
