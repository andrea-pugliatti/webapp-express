const connection = require("../data/db");

const index = (req, res) => {
	const query = `SELECT * FROM movies`;

	connection.query(query, (err, response) => {
		if (err)
			return res
				.status(500)
				.json({ error: err, message: "Database query failed" });

		res.json(response);
	});
};

const show = (req, res) => {
	const id = Number(req.params.id);
	const query = `SELECT * FROM movies WHERE id = ?`;

	connection.query(query, [id], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0)
			return res.status(404).json({ error: 404, message: "Post Not Found" });

		res.json(response[0]);
	});
};

const store = (req, res) => {
	res.send(`Store me the book`);
};

const update = (req, res) => {
	res.send(`Update the book with id ${req.params.id}`);
};

const modify = (req, res) => {
	res.send(`Modify the book with id ${req.params.id}`);
};

const destroy = (req, res) => {
	res.send(`Destroy the book with id ${req.params.id}`);
};

module.exports = { index, show, store, update, modify, destroy };
