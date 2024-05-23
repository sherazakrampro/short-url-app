require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

if (!secret) {
  throw new Error("Missing JWT_SECRET_KEY in environment variables");
}

const setUser = (user) => {
  try {
    return jwt.sign({ _id: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("Error signing token:", error);
    throw error;
  }
};

const getUser = (token) => {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};
