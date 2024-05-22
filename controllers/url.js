const URL = require("../models/url");

const generateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    originalUrl: body.url,
    visitHistory: [],
  });
  return res.json({ shortId: shortID });
};

const getOriginalURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!entry) return res.status(404).json({ error: "url not found" });
  return res.redirect(entry.originalUrl);
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = { generateNewShortURL, getOriginalURL, getAnalytics };
