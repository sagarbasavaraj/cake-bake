const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  kg: Number,
  deliveryDateTime: Date,
  cakeType: String,
  message: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
