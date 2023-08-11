const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51LV1sRSEdjfuZjo4CsG3qzSA8bWflmQ12iScUULFI15jvIVYIBUSZWlJ40rnPPmWk00GfhWlf50emU0qZRvuvdyz00YNP1NdGH"
);

router.post("/payment", async (req, res) => {
  try {
    const stripeRes = await stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd",
    });
    res.status(200).json(stripeRes.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/create-payment-intent", async (req, res) => {
//   try {
//     const intent = await stripe.paymentIntents.create({
//       amount: req.body.amount,
//       currency: "usd",
//     });
//     res.status(200).json({ clientSecret: intent.client_secret });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
