const { Schema, model } = require('mongoose');

const CheckoutSchema = new Schema({
    title: String,
    price: Number,
    quantity: Number,
    avatar: String,
    initialTotal: Number
})


module.exports = model('Checkout', CheckoutSchema);