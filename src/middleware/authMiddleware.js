const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const authMiddleware = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({
      status: "ERR",
      message: "User has not logged in",
    });
  } else {
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(401).json({
          status: "ERR",
          message: err,
        });
      }
      if (user?.isAdmin) {
        next();
      } else {
        return res.status(401).json({
          status: "ERR",
          message: "User is not admin",
        });
      }
      console.log("user", user);
    });
  }
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        status: "ERR",
        message: "Unauthorized",
      });
    }
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(401).json({
        status: "ERR",
        message: "User is not admin",
      });
    }
    console.log("user", user);
  });
};

module.exports = { authMiddleware, authUserMiddleware };
