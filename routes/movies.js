const express = require("express");
const moviesController = require("../controllers/moviesController");
const router = express.Router();

// Index route
router.get("/", moviesController.index);

// Show route
router.get("/:id", moviesController.show);

// Store route
router.post("/", moviesController.store);

// Store review route
router.post("/:id/review", moviesController.storeReview);

// Update route
router.put("/:id", moviesController.update);

// Modify route
router.patch("/:id", moviesController.modify);

// Destroy route
router.delete("/:id", moviesController.destroy);

module.exports = router;
