const { getUser } = require("../service/auth");

const restrictToLoggedInUser = async (req, res, next) => {
  // const userUid = req.cookies?.uid;
  const userUid = req.headers["authorization"];
  console.log(req.headers);

  if (!userUid || !userUid.startsWith("Bearer ")) {
    return res.redirect("/login");
  }

  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  // const userUid = req.cookies?.uid;
  const userUid = req.headers["authorization"];

  if (!userUid || !userUid.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
};

module.exports = { restrictToLoggedInUser, checkAuth };
