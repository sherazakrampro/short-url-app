const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const urlRoute = require("./routes/url");
const { getAllURLs } = require("./controllers/url");

const app = express();

connectDB(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

// routes
app.use("/url", urlRoute);
app.get("/", getAllURLs);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
