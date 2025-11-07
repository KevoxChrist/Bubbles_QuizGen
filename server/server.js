const express = require("express");
const cors = require("cors");
const quizRoutes = require("./src/routes/quizRoute.js");
const app = express();

//----------------App Config-----------------------
app.use(express.json()); //serving JSON
app.use(cors()); //Serving frontend requests through cors
const PORT = 3000;


//-----------------ROUTES------------------------------

app.use("/api", quizRoutes);


//-------------RUN SERVER---------------------------------
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});