const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const urlRoute = require("./routes/url");

connectDB(process.env.MONGO_URL);

const app = express();
app.use(express.json());

app.use("/url", urlRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
