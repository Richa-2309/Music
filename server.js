const express = require("express");
const path = require("path");

const server = express();

const PORT = 3000;


// Serve static files
server.use(express.static(path.join(__dirname, "public")));


// Home route
server.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


// Start server
server.listen(PORT, () => {

    console.log(
        `Music System running at http://localhost:${PORT}`
    );

});
