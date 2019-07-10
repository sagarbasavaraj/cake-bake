const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cakeSchema = new Schema({
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

const CakeModel = mongoose.model('Cake', cakeSchema);

module.exports = CakeModel;
