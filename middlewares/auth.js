const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
};

const restrictTo = (roles = []) => {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    next();
  };
};

module.exports = { checkForAuthentication, restrictTo };

// const restrictToLoggedInUser = async (req, res, next) => {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   console.log(req.headers);

//   if (!userUid || !userUid.startsWith("Bearer ")) {
//     return res.redirect("/login");
//   }

//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) {
//     return res.redirect("/login");
//   }

//   req.user = user;
//   next();
// };

// const checkAuth = async (req, res, next) => {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];

//   if (!userUid || !userUid.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   req.user = user;
//   next();
// };
