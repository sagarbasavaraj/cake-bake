const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: String,
    phoneNumber: Number,
    type: String,
    quantity: Number,
    kg: Number,
    theme: String,
    orderDate: Date,
    status: String,
    message: String,
    shape: String,
    flavour: String
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
