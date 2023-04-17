const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();

// Apply compression middleware
app.use(compression());

// Set the public folder as a static directory
app.use(express.static(path.join(__dirname, './public/')));

// Serve the index.html file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Read the certificate and key from files
const cert = fs.readFileSync(path.join(__dirname, './cert.pem'));
const key = fs.readFileSync(path.join(__dirname, './key.pem'));

// Create an instance of the https.Server class
const server = https.createServer({ cert, key }, app);

// Start the server
const port = 8400;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
