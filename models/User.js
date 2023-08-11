const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobileNo: { type: Number, required: true },
    address: { type: String, required: true },
    purchases: {
      type: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
          date: { type: String, required: true },
        },
      ],
      default: [],
    },
    likedProducts: {
      type: Array,
    },
    refferals: {
      type: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
          profit: { type: Number },
        },
      ],
      default: [],
    },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
