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
	const queryReviews = `SELECT id, name, vote, text, created_at, updated_at FROM reviews WHERE movie_id = ?`;

	connection.query(query, [id], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0)
			return res.status(404).json({ error: 404, message: "Post Not Found" });

		connection.query(queryReviews, [id], (errReviews, resReviews) => {
			if (errReviews)
				return res
					.status(500)
					.json({ error: errReviews, message: errReviews.message });

			res.json({ ...response[0], reviews: resReviews });
		});
	});
};

const store = (req, res) => {
	res.send(`Store me the book`);
};

const storeReview = (req, res) => {
	const id = Number(req.params.id);

	const { name, review, rating } = req.body;
	const query = `INSERT INTO reviews(movie_id, name, vote, text) VALUES (?,?, ?, ?);`;
	connection.query(query, [id, name, rating, review], (err, response) => {
		if (err) return res.status(500).json({ error: true, message: err.message });

		res.status(201).json({ message: "Review created" });
	});
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

module.exports = { index, show, store, storeReview, update, modify, destroy };
