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

module.exports = { generateNewShortURL };
