const { Schema, model } = require('mongoose');

const PaymentIdram  = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    title: Array,
    quantity: Array,
    totalValueTemp: Array,
    totalValue: Number,
    now: String,
    delivery_price: Number,
    EDP_BILL_NO:Number,
    EDP_AMOUNT:Array,

    user: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    paymentStatus: Boolean,
    status: String,
})

module.exports = model('online Bank idram', PaymentIdram );