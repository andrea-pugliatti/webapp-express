const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Show all books here");
});

router.get("/:id", (req, res) => {
	res.send(`Show me the book with id ${req.params.id}`);
});

router.post("/", (req, res) => {
	res.send(`Store me the book`);
});

router.put("/:id", (req, res) => {
	res.send(`Update the book with id ${req.params.id}`);
});

router.patch("/:id", (req, res) => {
	res.send(`Modify the book with id ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
	res.send(`Destroy the book with id ${req.params.id}`);
});

module.exports = router;
