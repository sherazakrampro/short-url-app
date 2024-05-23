const User = require("../models/user");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "all fields are required" });
  const user = await User.create({ name, email, password });
  return res.render("home");
};

module.exports = { userSignUp };
