const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");

const app = express();

connectDB(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/url", urlRoute);
app.use("/", staticRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
