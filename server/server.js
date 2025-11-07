const express = require("express");
const cors = require("cors");
const path = require("path");
const quizRoutes = require("./src/routes/quizRoute.js");
const app = express();

//----------------App Config-----------------------
app.use(express.json()); //serving JSON
app.use(cors()); //Serving frontend requests through cors
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "..", "dist")));

//-----------------ROUTES------------------------------

app.use("/api", quizRoutes);

// Catch-all route to serve the React app for client-side routing
app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

//-------------RUN SERVER---------------------------------
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});