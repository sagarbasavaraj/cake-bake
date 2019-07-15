const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: String,
    phoneNumber: Number,
    email: String,
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

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
