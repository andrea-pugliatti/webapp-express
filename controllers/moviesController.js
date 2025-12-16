const { pipeline } = require("@huggingface/transformers");

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

async function loadModel() {
	const classifier = await pipeline(
		"sentiment-analysis",
		"Xenova/distilbert-base-uncased-finetuned-sst-2-english",
		{ device: "cpu", dtype: "q4" },
	);
	return classifier;
}

const storeReview = async (req, res) => {
	const id = Number(req.params.id);

	const { name, vote, text } = req.body;

	if (!name || !vote || !text) {
		return res
			.status(400)
			.json({ error: true, message: "Something is wrong with the input" });
	}
	const classifier = await loadModel();
	const analysis = await classifier(text);
	// console.log(analysis);

	if (analysis[0].label === "NEGATIVE") {
		return res
			.status(400)
			.json({ error: true, message: "Something is wrong with the input" });
	}

	const query = `INSERT INTO reviews(movie_id, name, vote, text) VALUES (?, ?, ?, ?);`;

	connection.query(query, [id, name, vote, text], (err, response) => {
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
