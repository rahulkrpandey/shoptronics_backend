const router = require("express").Router();
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

// router.post("/", verifyToken, async (req, res) => {
//   const { id, refereeId, product } = req.body;
//   if (id === refereeId) {
//     res.status(400).json("You can not refer the product to yourself");
//   }

//   try {
//     const referee = await User.findById(refereeId);
//     referee.refferals.push(product);
//     referee.balance += product.profit;
//     await referee.save();
//     res.status(200).json(referee);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/", verifyToken, async (req, res) => {
  const { username, refereeUsername, product } = req.body;
  if (username === refereeUsername) {
    res.status(400).json("You can not refer the product to yourself");
  }

  try {
    const referee = await User.findOne({ username: refereeUsername });
    referee.refferals.push(product);
    referee.balance += product.profit;
    await referee.save();
    res.status(200).json(referee);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
