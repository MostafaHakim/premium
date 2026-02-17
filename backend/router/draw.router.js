const express = require("express");
const router = express.Router();
const drawController = require("../controller/draw.controller");

// Create a new draw
router.post("/", drawController.createDraw);

// Get all draws
router.get("/", drawController.getAllDraws);

// Get a single draw by ID
router.get("/:id", drawController.getDrawById);

// Delete a draw by date
router.delete("/", drawController.deleteDrawByDate);

module.exports = router;
