const { Schema, model } = require('mongoose');

const CashSchema = new Schema({
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
    city: {
        type: String,
        required: true
    },

    title: Array,
    quantity: Array,
    totalValueTemp: Array,
    totalValue: Number,
    now: String,
    delivery_price: Number,

    user: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },

    status: String
})



module.exports = model('Cash', CashSchema);