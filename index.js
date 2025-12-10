const express = require("express");
const movieRouter = require("./routes/movies");

const connection = require("./data/db");

const app = express();

const PORT = process.env.PORT;

// Static files
app.use(express.static("public"));
// Body Parser
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

// Main Route
app.get("/", (req, res) => {
	res.send("Main Index Route");
});

app.use("/api/movies", movieRouter);
