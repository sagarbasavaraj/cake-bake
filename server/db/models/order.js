const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  kg: Number,
  deliveryDateTime: Date,
  status: String,
  message: String,
  shape: String,
  flavour: String
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
