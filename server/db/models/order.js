const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  kg: Number,
  datetime: Date,
  status: String,
  message: String,
  shape: String,
  flavour: String
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
