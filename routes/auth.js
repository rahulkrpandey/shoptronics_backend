const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNo: req.body.mobileNo,
    address: req.body.address,
    firstName: req.body.email,
    isAdmin: req.body.isAdmin,
    // password: req.body.password,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  console.log("incoming req");
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("wrong credentials");
    }

    const password = CryptoJs.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET_KEY
    ).toString(CryptoJs.enc.Utf8);

    if (password !== req.body.password) {
      res.status(401).json("wrong credential");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "1d",
      }
    );

    const { password: p, ...userInfo } = user._doc;

    res.status(201).json({ ...userInfo, accessToken });
    //res.status(201).json(userInfo);
  } catch (err) {
    res.status(500).toString(err);
  }
});

module.exports = router;
