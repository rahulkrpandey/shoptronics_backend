const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// const current = __dirname;
// const userTest = require(current + "/routes/user");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
//const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/stripe");
const referralRoute = require("./routes/referral");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://rahulkrpandey:mongodbserver@cluster0.jysjyy8.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection);
//   client.close();
// });


// REGISTER AND LOGIN
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/checkout", paymentRoute);
app.use("/api/referrals", referralRoute);
// app.get("/api/users/userTest", (req, res) => {
//   res.send("hello world");
// });

app.listen(5000, () => {
  console.log("backend is running");
});
