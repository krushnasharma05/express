const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/chat', (req, res) => {
  const username = req.query.username || 'Guest'; // Retrieve username from query parameters

  fs.readFile('chat.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      data = 'No Chat Exist!';
    }

    const chatHistory = data || '';
    const formattedChatHistory = chatHistory
      .split('\n')
      .filter(message => message.trim() !== '')
      .map(message => {
        const [sender, content] = message.split(':');
        return `<strong>${sender.trim()}:</strong> ${content.trim()}`;
      })
      .join('<br>');

    res.send(`
      <html>
        <body>
          <pre>${formattedChatHistory}</pre>
          <form action="/chat" method="POST">
            <input type="text" name="message" placeholder="Enter message" required>
            <input type="hidden" name="username" value="${username}">
            <button type="submit">Send</button>
          </form>
        </body>
      </html>
    `);
  });
});

router.post('/chat', (req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  const obj = `${username}: ${message}\n`;
  fs.appendFile('chat.txt', obj, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/chat?username=${username}`);
    }
  });
});

module.exports = router;
