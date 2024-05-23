const express = require("express");
const {
  generateNewShortURL,
  getAnalytics,
  getOriginalURL,
} = require("../controllers/url");

const router = express.Router();

router.post("/", generateNewShortURL);
router.get("/:shortId", getOriginalURL);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
