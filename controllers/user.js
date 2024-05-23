const User = require("../models/user");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "all fields are required" });
  const user = await User.create({ name, email, password });
  return res.redirect("/");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "all fields are required" });
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "invalid username or password" });
  return res.redirect("/");
};

module.exports = { userSignUp, userLogin };
