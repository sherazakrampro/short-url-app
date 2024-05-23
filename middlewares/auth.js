const { getUser } = require("../service/auth");

const restrictToLoggedInUser = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");

  const user = await getUser(userUid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  const user = await getUser(userUid);
  req.user = user;
  next();
};

module.exports = { restrictToLoggedInUser, checkAuth };
