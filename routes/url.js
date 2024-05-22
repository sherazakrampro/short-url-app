const express = require("express");

const router = express.Router();

router.post("/", generateNewShortURL);

module.exports = router;
