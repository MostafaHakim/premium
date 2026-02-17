const express = require("express");
const router = express.Router();
const { createAdminWinners } = require("../controller/adminWinner.controller");

router.post("/create", createAdminWinners);

module.exports = router;
