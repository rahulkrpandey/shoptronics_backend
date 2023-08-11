//const router = require("express").Router();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headerToken = req.headers.token;
  if (headerToken) {
    const token = headerToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(401).json("Token is not valid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthenticate = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      console.log(req.user.id);
      res.status(403).json("You are not allowed!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthenticate,
  verifyTokenAndAdmin,
};
