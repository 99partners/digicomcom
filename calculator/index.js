/**
 * E-Commerce Profit Calculator Server
 * Simple Express server to serve the calculator pages
 */

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Calculator server running at http://localhost:${port}`);
});