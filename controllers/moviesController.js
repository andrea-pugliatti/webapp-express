const index = (req, res) => {
	res.send("Show all books here");
};

const show = (req, res) => {
	res.send(`Show me the book with id ${req.params.id}`);
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
