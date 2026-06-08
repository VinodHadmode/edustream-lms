const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post("/create-order", isAuthenticated, createOrder);

paymentRouter.post("/verify", isAuthenticated, verifyPayment);

module.exports = {
  paymentRouter,
};
