const express = require("express");
const cors = require("cors");
const path = require("path");
const quizRoutes = require("./src/routes/quizRoute.js");
const app = express();

//----------------App Config-----------------------
app.use(express.json()); //serving JSON
app.use(cors()); //Serving frontend requests through cors
const PORT = process.env.PORT || 3000;


//-----------------ROUTES------------------------------

app.use("/api", quizRoutes);

//-------------SERVE STATIC FILES (Production)----------
// Serve static files from the React app build
app.use(express.static(path.join(__dirname, "../dist")));

// All remaining requests return the React app, so it can handle routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

//-------------RUN SERVER---------------------------------
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});